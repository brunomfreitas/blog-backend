import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId,
} from 'typeorm';
import { Alternativas } from './alternativas.entity';
import { ProvaAluno } from './prova-aluno.entity';
import { Questao } from './questao.entity';

@Entity({ schema: 'blog', name: 'prova_aluno_resposta' })
export class ProvaAlunoResposta {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProvaAluno, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prova_aluno_id' })
  provaAluno!: ProvaAluno;

  @RelationId((item: ProvaAlunoResposta) => item.provaAluno)
  provaAlunoId!: number;

  @ManyToOne(() => Questao, { nullable: false })
  @JoinColumn({ name: 'questaoid' })
  questao!: Questao;

  @RelationId((item: ProvaAlunoResposta) => item.questao)
  questaoId!: number;

  @ManyToOne(() => Alternativas, { nullable: true })
  @JoinColumn({ name: 'alternativaid' })
  alternativa!: Alternativas | null;

  @RelationId((item: ProvaAlunoResposta) => item.alternativa)
  alternativaId!: number | null;

  @Column({ name: 'resposta_letra', type: 'char', length: 1, nullable: true })
  respostaLetra!: string | null;

  @Column({ name: 'correta', type: 'boolean', nullable: true })
  correta!: boolean | null;

  @CreateDateColumn({ name: 'createdat' })
  createdAt!: Date;
}