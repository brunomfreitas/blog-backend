import { PostRepository } from "@/repositories/typeorm/post.repository";
import { UpdatePostDTO } from "./post-dtos";


export class UpdateUseCase {
	constructor(private repository: PostRepository) {}

	handler(data: UpdatePostDTO) {
		return this.repository.update(data)
	}
}
