import { PostRepository } from "@/repositories/typeorm/post.repository";
import { CreatePostDTO } from "./post-dtos";

export class CreateUseCase {
	constructor(private repository: PostRepository) {}

	handler(data: CreatePostDTO) {
		return this.repository.create(data)
	}
}