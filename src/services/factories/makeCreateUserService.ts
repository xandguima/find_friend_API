import { PrismaUserRepository } from "../../repositories/prisma/userRepositories"
import { CreateUserService } from "../createUser"


export function makeCreateUserService() {

  const usersRepository = new PrismaUserRepository()
  const service = new CreateUserService(usersRepository)
  return service
}
