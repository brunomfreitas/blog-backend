import { IPostRepository } from "@/repositories/post.repository.interface";

export class FindAllUseCase {
  constructor(private repository: IPostRepository) {}

  async handler(page: number, limit: number) {
    return this.repository.findAll(page, limit)
  }
}
