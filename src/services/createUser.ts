import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/userRepositories";
import { UserAlredyExistsError } from "./errors/userAlredyExistsError";
import { hash } from "bcryptjs";


interface CreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
  cep?: number;
  address?: string;
  tel?: number
}
interface CreateUserServiceResponse {
  user: User
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
    cep,
    address,
    tel
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlredyExistsError()
    }
    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      cep: cep ?? null,
      address: address ?? null,
      tel: tel ?? null
    })
    return {
      user,
    }

  }
}