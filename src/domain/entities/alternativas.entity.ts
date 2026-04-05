// questao.entity.ts
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId
} from 'typeorm'
import { Questao } from './questao.entity'

@Entity({ schema: 'blog', name: 'alternativas' })
export class Alternativas {
  
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'alternativa', type: 'text' })
  alternativa: string
  
  // ===== Relacionamentos =====  
  @ManyToOne(() => Questao, { nullable: false, eager: false })
  @JoinColumn({ name: 'questaoid', referencedColumnName: 'id' })
  alternativaQuestao!: Questao

  // expõe o ID sem precisar de join
  @RelationId((alternativa: Alternativas) => alternativa.alternativaQuestao)
  questaoId!: number
    
}
