import { Prisma, Role, User } from "@prisma/client";
import { UsersRepository } from "../userRepositories";
import { randomUUID } from "node:crypto";



export class InMemoryUserRepository implements UsersRepository {

  public users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)
    if (!user) {
      return null
    }

    return user
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      tel: data.tel ,
      role: data.role ?? 'USER',
      uf: data.uf,
      city: data.city,
      address: data.address,
      created_at: new Date(),
      updated_at: new Date(),
    }
    
    this.users.push(user)
    return user
  }
}

