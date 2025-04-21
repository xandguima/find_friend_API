import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../../repositories/userRepositories";
import { prisma } from "../../lib/prisma";


export class PrismaUserRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })
    return user
  }
  create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({
      data

    })
    return user
  }
}