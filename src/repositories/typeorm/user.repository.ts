// src/repositories/typeorm/user.repository.ts
import { Person } from '@/domain/entities/person.entity'
import { User } from '@/domain/entities/user.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { CreateUserDTO, UpdateUserDTO } from '@/use-case/user/user-dtos'
import { Repository } from 'typeorm'
// import * as bcrypt from 'bcryptjs' // se for hashear senha

export class UserRepository {
  private repository: Repository<User>
  private personRepo: Repository<Person>

  constructor() {
    this.repository = appDataSource.getRepository(User)
    this.personRepo = appDataSource.getRepository(Person)
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['person'],
    })
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['person'],
    })
  }

  async create(data: CreateUserDTO): Promise<User> {
    const person = await this.personRepo.findOne({ where: { id: data.personid } })
    if (!person) throw new Error('Person not found')

    const entity = this.repository.create({
      person,
      login: data.login,
      password: data.password, // faça hash aqui se necessário
      status: data.status ?? true,
    })
    return this.repository.save(entity)
  }

  async update(data: UpdateUserDTO): Promise<User> {
    // 1) Monta um "partial" com o que chegou (sem carregar ainda do DB)
    const partial: Partial<User> = {
      id: data.id,
      login: data.login,
      status: data.status,
      // password será tratada separadamente
    }

    // 2) Se trocar a pessoa, valide e conecte
    if (typeof data.personid === 'number') {
      const person = await this.personRepo.findOne({ where: { id: data.personid } })
      if (!person) throw new Error('Person not found')
      partial.person = person
    }

    // 3) Carrega a entidade existente e "mergeia" (preload)
    const entity = await this.repository.preload(partial)
    if (!entity) throw new Error('User not found')

    // 4) Senha (hash opcional)
    if (typeof data.password === 'string') {
      entity.password = data.password
      // entity.password = await bcrypt.hash(data.password, 10)
    }

    // 5) Persiste e retorna a entidade atualizada
    return this.repository.save(entity)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }

}