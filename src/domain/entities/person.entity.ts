import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPerson } from '../interfaces/person.interface';

@Entity({ schema: 'blog', name: 'person' })
export class Person implements IPerson {
  
	@PrimaryGeneratedColumn()
  	id?: number | undefined

	@Column({ name: 'name',	type: 'varchar' })
	name: string

	@Column({ name: 'cpf', type: 'varchar' })
	cpf: string

	@Column({ name: 'birth', type: 'date' })
	birth: Date

	@Column({ name: 'email', type: 'varchar' })
	email: string

	@Column({ name: 'status', type: 'boolean', default: true })
	status: boolean

}
