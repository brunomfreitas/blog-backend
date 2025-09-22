import { PostStatus } from "@/domain/entities/post-status.entity";
import { PostStatusRepository } from "@/repositories/typeorm/post-status.repository";


type Input = Omit<PostStatus, 'id'>;

export class CreateUseCase {
	constructor(private repository: PostStatusRepository) {}

	handler(data: Input) {
		return this.repository.create(data)
	}
}