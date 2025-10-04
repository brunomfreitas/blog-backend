import { IPostRepository } from "@/repositories/post.repository.interface";

export class ListAllUseCase {
  constructor(private repository: IPostRepository) {}

  async handler(page: number, limit: number) {
    return this.repository.listAll(page, limit)
  }
}
