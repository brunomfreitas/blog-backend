import { IPersonRepository } from '@/repositories/person.repository.interface'
// import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class FindUseCase {

  constructor(private personRepository: IPersonRepository) {}

  async handler(id: number) {
    
	const person = await this.personRepository.findById(id)

    // if (!person) throw new ResourceNotFoundError()

    return person
  }
}
