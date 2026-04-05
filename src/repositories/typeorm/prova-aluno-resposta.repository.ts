import { Alternativas } from '@/domain/entities/alternativas.entity';
import { ProvaAlunoResposta } from '@/domain/entities/prova-aluno-resposta.entity';
import { ProvaAluno } from '@/domain/entities/prova-aluno.entity';
import { Questao } from '@/domain/entities/questao.entity';
import { appDataSource } from '@/lib/typeorm/typeorm';
import { SaveRespostaDTO } from '@/use-case/prova-aluno-resposta/prova-aluno-resposta-dtos';

export class ProvaAlunoRespostaRepository {
  private repo = appDataSource.getRepository(ProvaAlunoResposta);
  private provaAlunoRepo = appDataSource.getRepository(ProvaAluno);
  private questaoRepo = appDataSource.getRepository(Questao);
  private alternativaRepo = appDataSource.getRepository(Alternativas);

  async saveMany(data: SaveRespostaDTO[]) {
    const results: ProvaAlunoResposta[] = [];

    for (const item of data) {
      const provaAluno = await this.provaAlunoRepo.findOne({
        where: { id: item.provaAlunoId },
      });

      if (!provaAluno) throw new Error('ProvaAluno not found');

      const questao = await this.questaoRepo.findOne({
        where: { id: item.questaoId },
      });

      if (!questao) throw new Error('Questao not found');

      let alternativa = null;

      if (item.alternativaId) {
        alternativa = await this.alternativaRepo.findOne({
          where: { id: item.alternativaId },
        });
      }

      let existing = await this.repo.findOne({
        where: {
          provaAluno: { id: item.provaAlunoId },
          questao: { id: item.questaoId },
        },
      });

      if (existing) {
        existing.alternativa = alternativa;
        existing.respostaLetra = item.respostaLetra ?? null;
        existing.correta = item.correta ?? null;

        results.push(await this.repo.save(existing));
        continue;
      }

      const created = this.repo.create({
        provaAluno,
        questao,
        alternativa,
        respostaLetra: item.respostaLetra ?? null,
        correta: item.correta ?? null,
      });

      results.push(await this.repo.save(created));
    }

    return results;
  }

  async listByProvaAluno(provaAlunoId: number) {
    return this.repo.find({
      where: { provaAluno: { id: provaAlunoId } },
      relations: ['questao', 'alternativa'],
      order: { id: 'ASC' },
    });
  }
}