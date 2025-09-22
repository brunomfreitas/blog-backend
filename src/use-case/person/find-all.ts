import { IPersonRepository } from '@/repositories/person.repository.interface'

export class FindAllUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async handler(page: number, limit: number) {
    return this.personRepository.findAll(page, limit)
  }
}
