import { PostStatus } from '@/domain/entities/post-status.entity'
import { IPostStatus } from '@/domain/interfaces/post-status.interface'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Repository } from 'typeorm'
import { IPostStatusRepository } from '../post-status.repository.interface'



export class PostStatusRepository implements IPostStatusRepository {
  private repository: Repository<PostStatus>

  constructor() {
    this.repository = appDataSource.getRepository(PostStatus)
  }

  async findAll(page: number, limit: number): Promise<IPostStatus[]> {
    return this.repository.find({      
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async findById(id: number): Promise<IPostStatus | null> {
    return this.repository.findOne({      
      where: { id },
    })
  }

  async create(data: Omit<IPostStatus, 'id'>): Promise<IPostStatus> {
    const entity = this.repository.create(data);
	return this.repository.save(entity)
  }

  async update(data: IPostStatus): Promise<IPostStatus> {
    return this.repository.save(data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
