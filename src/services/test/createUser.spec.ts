import { describe, expect, it,beforeEach } from "vitest";
import { InMemoryUserRepository } from "../../repositories/inMemory/userRepository";
import { CreateUserService } from "../createUserService";

let usersRepository: InMemoryUserRepository
let sut: CreateUserService


describe('Create user service', () => {
  beforeEach(()=>{
    usersRepository = new InMemoryUserRepository()
    sut = new CreateUserService(usersRepository)
  })

  it('should be able to create a user', async () => {
    const {user} = await sut.execute({
      name: 'John Doe',
      email: 'jV3wI@example.com',
      address: 'rua 1',
      cep: 59066080,
      password: '123456',
      tel: 11999999999
    })
    expect(user.id).toEqual(expect.any(String))
    

  })
})