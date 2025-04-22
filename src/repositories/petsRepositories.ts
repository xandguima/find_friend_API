import { Pet, Prisma } from "@prisma/client";

interface query{
  uf:string
  city:string
}

export interface PetsRepositories{
  create(data:Prisma.PetCreateInput):Promise<Pet>
  findById(id:string):Promise<Pet>
  searchMany(query:query):Promise<Pet[]>
}