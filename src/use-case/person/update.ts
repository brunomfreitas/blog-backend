import { Person } from '@/domain/entities/person.entity';
import { PersonRepository } from '@/repositories/typeorm/person.repository';

export class UpdateUseCase {
	constructor(private personRepository: PersonRepository) {}

	handler(person: Person) {
		return this.personRepository.update(person)
	}
}
