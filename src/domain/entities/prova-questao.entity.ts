import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId,
} from 'typeorm';
import { Prova } from './prova.entity';
import { Questao } from './questao.entity';

@Entity({ schema: 'blog', name: 'prova_questao' })
export class ProvaQuestao {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Prova, { nullable: false, eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'provaid', referencedColumnName: 'id' })
  prova!: Prova;

  @RelationId((item: ProvaQuestao) => item.prova)
  provaId!: number;

  @ManyToOne(() => Questao, { nullable: false, eager: false })
  @JoinColumn({ name: 'questaoid', referencedColumnName: 'id' })
  questao!: Questao;

  @RelationId((item: ProvaQuestao) => item.questao)
  questaoId!: number;

  @Column({ name: 'numero_questao', type: 'int' })
  numeroQuestao!: number;

  @CreateDateColumn({ name: 'createdat' })
  createdAt!: Date;
}