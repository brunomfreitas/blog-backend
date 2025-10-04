import { IPostRepository } from "@/repositories/post.repository.interface";

export class ListUseCase {
  constructor(private repository: IPostRepository) {}

  async handler(page: number, limit: number) {
    return this.repository.list(page, limit)
  }
}
