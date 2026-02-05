import { IPersonRepository } from '@/repositories/person.repository.interface';

export class FindByTypeUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async handler(type: string) {
    return this.personRepository.findByType(type);
  }
}
