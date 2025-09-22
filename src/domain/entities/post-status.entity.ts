import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IPostStatus } from '../interfaces/post-status.interface'

@Entity({ name: 'blog.post_status' })
export class PostStatus implements IPostStatus {
  
	@PrimaryGeneratedColumn()
  	id?: number | undefined

	@Column({ name: 'nm_status', type: 'varchar' })
	name: string
	
	@Column({ name: 'status', type: 'boolean', default: true })
	status: boolean

}
