import { UserRepository } from '@/repositories/typeorm/user.repository';
import { UpdateUserDTO } from './user-dtos';

export class UpdateUseCase {
	constructor(private repository: UserRepository) {}

	handler(data: UpdateUserDTO) {
		return this.repository.update(data)
	}
}
