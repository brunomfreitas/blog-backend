import { UserRepository } from "@/repositories/typeorm/user.repository";
import { CreateUserDTO } from "./user-dtos";

export class CreateUseCase {
	constructor(private repository: UserRepository) {}

	handler(data: CreateUserDTO) {
		return this.repository.create(data)
	}
}