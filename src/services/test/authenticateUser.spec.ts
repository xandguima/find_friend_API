import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryUserRepository } from "../../repositories/inMemory/userRepository";
import { AuthenticateUserService } from "../authenticateUserService";
import { hash } from "bcryptjs";
import { InvalidCredencialsError } from "../errors/invalidCredencialsError";

let usersRepository: InMemoryUserRepository
let sut: AuthenticateUserService


describe('Create user service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthenticateUserService(usersRepository)
  })

  it('should be able to authenticate user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jV3wI@example.com',
      address: 'rua 1',
      uf:'RN',
      city:'Natal',
      cep: 59066080,
      password_hash: await hash('123456',6),
      tel: 11999999999
    })

    const {user} = await sut.execute({
      email: 'jV3wI@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))

  })

  it('should be able to not authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jV3wI@example.com',
      address: 'rua 1',
      uf:'RN',
      city:'Natal',
      cep: 59066080,
      password_hash: await hash('123456',6),
      tel: 11999999999
    })

    await expect(()=>{
     return sut.execute({
        email: 'jV3I@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredencialsError)
  })
  it('should be able to not authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jV3wI@example.com',
      address: 'rua 1',
      uf:'RN',
      city:'Natal',
      cep: 59066080,
      password_hash: await hash('123456',6),
      tel: 11999999999
    })

    await expect(()=>{
     return sut.execute({
        email: 'jV3wI@example.com',
        password: '12456',
      })
    }).rejects.toBeInstanceOf(InvalidCredencialsError)
  })
  
})