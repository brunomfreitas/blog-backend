import { Person } from '@/domain/entities/person.entity';
import { ProvaAluno } from '@/domain/entities/prova-aluno.entity';
import { Prova } from '@/domain/entities/prova.entity';
import { ProvaAlunoStatus } from '@/domain/enums/prova-aluno-status.enum';
import { appDataSource } from '@/lib/typeorm/typeorm';
import { IProvaAlunoRepository } from '@/repositories/prova-aluno.repository.interface';
import { FinishProvaAlunoDTO, StartProvaAlunoDTO } from '@/use-case/prova-aluno/prova-aluno-dtos';
import { Repository } from 'typeorm';

export class ProvaAlunoRepository implements IProvaAlunoRepository {
  private provaAlunoRepo: Repository<ProvaAluno>;
  private provaRepo: Repository<Prova>;
  private personRepo: Repository<Person>;

  constructor() {
    this.provaAlunoRepo = appDataSource.getRepository(ProvaAluno);
    this.provaRepo = appDataSource.getRepository(Prova);
    this.personRepo = appDataSource.getRepository(Person);
  }

  async findByProvaAndAluno(provaId: number, alunoId: number): Promise<ProvaAluno | null> {
    return this.provaAlunoRepo.findOne({
      where: {
        prova: { id: provaId },
        aluno: { id: alunoId },
      },
      relations: ['prova', 'aluno'],
    });
  }

  async start(data: StartProvaAlunoDTO): Promise<ProvaAluno> {
    const prova = await this.provaRepo.findOne({ where: { id: data.provaId } });
    if (!prova) throw new Error('Prova not found');

    const aluno = await this.personRepo.findOne({ where: { id: data.alunoId } });
    if (!aluno) throw new Error('Aluno not found');

    let provaAluno = await this.findByProvaAndAluno(data.provaId, data.alunoId);

    if (provaAluno) {
      if (
        provaAluno.status === ProvaAlunoStatus.FINALIZADA ||
        provaAluno.status === ProvaAlunoStatus.EXPIRADA
      ) {
        return provaAluno;
      }

      if (provaAluno.status === ProvaAlunoStatus.EM_ANDAMENTO) {
        return provaAluno;
      }
    }

    provaAluno = this.provaAlunoRepo.create({
      prova,
      aluno,
      status: ProvaAlunoStatus.EM_ANDAMENTO,
      nota: null,
      tempoGasto: null,
      dataInicio: new Date(),
      dataFim: null,
    });

    return this.provaAlunoRepo.save(provaAluno);
  }

  async finish(data: FinishProvaAlunoDTO): Promise<ProvaAluno> {
    const provaAluno = await this.findByProvaAndAluno(data.provaId, data.alunoId);

    if (!provaAluno) {
      throw new Error('ProvaAluno not found');
    }

    if (
      provaAluno.status === ProvaAlunoStatus.FINALIZADA ||
      provaAluno.status === ProvaAlunoStatus.EXPIRADA
    ) {
      return provaAluno;
    }

    provaAluno.status = data.status;
    provaAluno.nota = data.nota;
    provaAluno.tempoGasto = data.tempoGasto;
    provaAluno.dataFim = new Date();

    return this.provaAlunoRepo.save(provaAluno);
  }
}