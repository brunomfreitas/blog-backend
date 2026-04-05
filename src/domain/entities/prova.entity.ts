import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId
} from 'typeorm'
import { Person } from './person.entity'

@Entity({ schema: 'blog', name: 'prova' })
export class Prova {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'descricao', type: 'text' })
  descricao: string

  @Column({ name: 'tempo_prova', type: 'int' })
  tempoProva: number

  @CreateDateColumn({ name: 'createdat' })
  createdAt!: Date

  @ManyToOne(() => Person, { nullable: false, eager: false })
  @JoinColumn({ name: 'createdby', referencedColumnName: 'id' })
  createdByPerson!: Person

  @RelationId((prova: Prova) => prova.createdByPerson)
  createdBy!: number
}