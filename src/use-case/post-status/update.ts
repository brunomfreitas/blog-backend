import { PostStatus } from '@/domain/entities/post-status.entity';
import { PostStatusRepository } from '@/repositories/typeorm/post-status.repository';

export class UpdateUseCase {
	constructor(private repository: PostStatusRepository) {}

	handler(data: PostStatus) {
		return this.repository.update(data)
	}
}
