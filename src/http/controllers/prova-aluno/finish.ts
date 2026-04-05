import { ProvaAlunoStatus } from '@/domain/enums/prova-aluno-status.enum';
import { ProvaAlunoRepository } from '@/repositories/typeorm/prova-aluno.repository';
import { makeUseCase } from '@/use-case/factory/make-use-case';
import { FinishProvaAlunoUseCase } from '@/use-case/prova-aluno/finish';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function finish(req: Request, res: Response) {
  const schema = z.object({
    provaId: z.coerce.number(),
    alunoId: z.coerce.number(),
    status: z.nativeEnum(ProvaAlunoStatus),
    nota: z.coerce.number(),
    tempoGasto: z.coerce.number(),
  });

  const data = schema.parse(req.body);

  const useCase = makeUseCase(FinishProvaAlunoUseCase, ProvaAlunoRepository);
  const result = await useCase.handler(data);

  return res.status(200).json(result);
}