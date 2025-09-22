import { IUserRepository } from '@/repositories/user.repository.interface'

export class FindAllUseCase {
  constructor(private repository: IUserRepository) {}

  async handler(page: number, limit: number) {
    return this.repository.findAll(page, limit)
  }
}
