import { Person } from '@/domain/entities/person.entity'
import { IPerson } from '@/domain/interfaces/person.interface'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Repository } from 'typeorm'
import { IPersonRepository } from '../person.repository.interface'


export class PersonRepository implements IPersonRepository {
  private repository: Repository<Person>

  constructor() {
    this.repository = appDataSource.getRepository(Person)
  }

  async findAll(page: number, limit: number): Promise<IPerson[]> {
    return this.repository.find({      
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async findById(id: number): Promise<IPerson | null> {
    return this.repository.findOne({      
      where: { id },
    })
  }

  async create(data: Omit<IPerson, 'id'>): Promise<IPerson> {
    const entity = this.repository.create(data);
	return this.repository.save(entity)
  }

  async update(data: IPerson): Promise<IPerson> {
    return this.repository.save(data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
