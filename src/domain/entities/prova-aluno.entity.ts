import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId
} from 'typeorm';
import { ProvaAlunoStatus } from '../enums/prova-aluno-status.enum';
import { Person } from './person.entity';
import { Prova } from './prova.entity';

@Entity({ schema: 'blog', name: 'prova_aluno' })
export class ProvaAluno {
	@PrimaryGeneratedColumn()
	id!: number

	@ManyToOne(() => Prova, { nullable: false, eager: false, onDelete: "CASCADE" })
  	@JoinColumn({ name: "provaid", referencedColumnName: "id" })
  	prova!: Prova;

	@RelationId((provaAluno: ProvaAluno) => provaAluno.prova)
	provaId!: number;

	
	@ManyToOne(() => Person, { nullable: false, eager: false })
	@JoinColumn({ name: 'alunoid', referencedColumnName: 'id' })
	aluno!: Person

	@RelationId((provaAluno: ProvaAluno) => provaAluno.aluno)
  	alunoId!: number;

	
	@Column({ name: "status", type: "varchar", length: 20, default: ProvaAlunoStatus.PENDENTE })
	status!: ProvaAlunoStatus;

	@Column({
		name: "nota",
		type: "numeric",
		precision: 5,
		scale: 2,
		nullable: true,
	})
  	nota!: number | null;

	@Column({ name: 'tempo_gasto', type: 'int', nullable: true })
	tempoGasto!: number | null;

	@Column({ name: "data_inicio", type: "timestamp", nullable: true })
	dataInicio!: Date | null;

	@Column({ name: "data_fim", type: "timestamp", nullable: true })
	dataFim!: Date | null;

	@CreateDateColumn({ name: "createdat", type: "timestamp" })
	createdAt!: Date;
}