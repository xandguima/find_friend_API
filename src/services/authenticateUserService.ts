import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/userRepositories";
import { InvalidCredencialsError } from "./errors/invalidCredencialsError";
import { compare } from "bcryptjs";

interface AuthenticateServiceRequest {
  email: string,
  password: string
}

interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateUserService {
  constructor(private userRepository: UsersRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredencialsError()
    }
    const passwordMatches = await compare(password, user.password_hash)
    if (!passwordMatches) {
      throw new InvalidCredencialsError()
    }
    return {
      user,
    }
  }

}
