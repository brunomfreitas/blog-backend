import { Category } from '@/domain/entities/category.entity'
import { ICategory } from '@/domain/interfaces/category.interface'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Repository } from 'typeorm'
import { ICategoryRepository } from '../category.repository.interface'



export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = appDataSource.getRepository(Category)
  }

  async findAll(page: number, limit: number): Promise<ICategory[]> {
    return this.repository.find({      
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async findById(id: number): Promise<ICategory | null> {
    return this.repository.findOne({      
      where: { id },
    })
  }

  async create(data: Omit<ICategory, 'id'>): Promise<ICategory> {
    const entity = this.repository.create(data);
	return this.repository.save(entity)
  }

  async update(data: ICategory): Promise<ICategory> {
    return this.repository.save(data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
