export class UserAlredyExistsError extends Error {
  constructor() {
    super('User already exists.')
  }
}