import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	RelationId,
} from 'typeorm'
import { IUser } from '../interfaces/user.interface'
import { Person } from './person.entity'

@Entity({
  name: 'blog.user',
})
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id?: number | undefined

  @Column({
    name: 'login',
    type: 'varchar',
  })
  login: string

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string

  @Column({
    name: 'status',
    type: 'boolean',
    default: true,
  })
  status: boolean

  @OneToOne(() => Person, { eager: false }) // evite eager global; carregue quando precisar
  @JoinColumn({ name: 'id_person' })
  person!: Person

  // Exponha o FK como "shadow column" só pra conveniência em queries
  @RelationId((user: User) => user.person)
  personid!: number

}
