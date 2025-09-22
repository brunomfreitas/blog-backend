import { IPostRepository } from '@/repositories/post.repository.interface'
// import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class FindUseCase {

  constructor(private repository: IPostRepository) {}

  async handler(id: number) {
    
	const data = await this.repository.findById(id)

    // if (!person) throw new ResourceNotFoundError()

    return data
  }
}
