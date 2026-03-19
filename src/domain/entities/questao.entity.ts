// questao.entity.ts
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId,
	UpdateDateColumn,
} from 'typeorm'
import { Category } from './category.entity'
import { Person } from './person.entity'

@Entity({ schema: 'blog', name: 'questao' })
export class Questao {
  
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'enunciado', type: 'text' })
  enunciado: string

  @Column({ name: 'resposta', type: 'varchar' })
  resposta: string

  @Column({ name: 'escolaridade', type: 'number' })
  escolaridade: number

  @Column({ name: 'turno', type: 'number' })
  turno: number

  @Column({ name: 'periodo', type: 'number' })
  periodo: number

  @Column({ name: 'tipo_questao', type: 'number' })
  tipoQuestao: number

  @Column({ name: 'status', type: 'boolean' })
  status: boolean

  @CreateDateColumn({ name: 'createdat'})
  createdAt!: Date

  @UpdateDateColumn({ name: 'postedat' })
  postedAt!: Date | null

  // ===== Relacionamentos =====

  // quem criou o post
  @ManyToOne(() => Person, { nullable: false, eager: false })
  @JoinColumn({ name: 'createdby', referencedColumnName: 'id' })
  createdByPerson!: Person

  // expõe o ID sem precisar de join
  @RelationId((questao: Questao) => questao.createdByPerson)
  createdBy!: number

  // quem publicou/aprovou o post
  @ManyToOne(() => Person, { nullable: true, eager: false })
  @JoinColumn({ name: 'postedby', referencedColumnName: 'id' })
  postedByPerson!: Person | null

  // expõe o ID sem precisar de join
  @RelationId((questao: Questao) => questao.postedByPerson)
  postedBy!: number | null

  // quem publicou/aprovou o post
  @ManyToOne(() => Category, { nullable: true, eager: false })
  @JoinColumn({ name: 'category', referencedColumnName: 'id' })
  questaoMateria: Category | null

  // expõe o ID sem precisar de join
  @RelationId((questao: Questao) => questao.questaoMateria)
  category!: number

}

@Index('idx_questao_createdby', ['createdBy'])
@Index('idx_questao_postedby', ['postedBy'])
@Entity()
class _IdxHack {} // (opcional: crie os índices direto via migration)
