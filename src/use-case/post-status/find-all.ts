import { IPostStatusRepository } from "@/repositories/post-status.repository.interface";


export class FindAllUseCase {
  constructor(private repository: IPostStatusRepository) {}

  async handler(page: number, limit: number) {
    return this.repository.findAll(page, limit)
  }
}
