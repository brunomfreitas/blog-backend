import { Person } from "@/domain/entities/person.entity";
import { PersonRepository } from "@/repositories/typeorm/person.repository";

type Input = Omit<Person, 'id'>;

export class CreatePersonUseCase {
	constructor(private personRepository: PersonRepository) {}

	handler(person: Input) {
		return this.personRepository.create(person)
	}
}