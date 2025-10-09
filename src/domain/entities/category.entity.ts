import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ICategory } from '../interfaces/category.interface'


@Entity({ schema: 'blog', name: 'category' })
export class Category implements ICategory {
  
	@PrimaryGeneratedColumn()
  	id?: number | undefined

	@Column({ name: 'nm_category',	type: 'varchar' })
	name: string

	@Column({ name: 'status', type: 'boolean', default: true })
	status: boolean

}
