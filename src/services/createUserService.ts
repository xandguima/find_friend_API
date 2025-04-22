import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/userRepositories";
import { UserAlredyExistsError } from "./errors/userAlredyExistsError";
import { hash } from "bcryptjs";
import { findCityByCep } from "../utils/external/cep/findCityByCep";


interface CreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
  cep: number;
  address: string;
  tel: number
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
    const { uf, city } = await findCityByCep(cep)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      cep: cep,
      uf,
      city,
      address: address,
      tel: tel
    })
    return {
      user,
    }

  }
}