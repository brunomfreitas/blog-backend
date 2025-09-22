import { IPost } from "@/domain/interfaces/post.interface"
import { CreatePostDTO, UpdatePostDTO } from "@/use-case/post/post-dtos"

export interface IPostRepository {  
	findAll(page: number, limit: number): Promise<IPost[]>
	findById(id: number): Promise<IPost | null>
	create(data: CreatePostDTO): Promise<IPost>
	update(data: UpdatePostDTO): Promise<IPost>
	delete(id: number): Promise<void>
	search(q: string, page: number, limit: number): Promise<{ data: IPost[]; total: number; }>;
}
