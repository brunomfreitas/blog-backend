import { Category } from "@/domain/entities/category.entity";
import { CategoryRepository } from "@/repositories/typeorm/category.repository";


type Input = Omit<Category, 'id'>;

export class CreateUseCase {
	constructor(private repository: CategoryRepository) {}

	handler(data: Input) {
		return this.repository.create(data)
	}
}