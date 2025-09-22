import { ICategoryRepository } from "@/repositories/category.repository.interface";


export class FindAllUseCase {
  constructor(private repository: ICategoryRepository) {}

  async handler(page: number, limit: number) {
    return this.repository.findAll(page, limit)
  }
}
