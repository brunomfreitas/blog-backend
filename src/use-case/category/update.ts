import { Category } from '@/domain/entities/category.entity';
import { CategoryRepository } from '@/repositories/typeorm/category.repository';

export class UpdateUseCase {
	constructor(private repository: CategoryRepository) {}

	handler(data: Category) {
		return this.repository.update(data)
	}
}
