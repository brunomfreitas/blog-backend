import { ProvaAlunoRepository } from '@/repositories/typeorm/prova-aluno.repository';
import { makeUseCase } from '@/use-case/factory/make-use-case';
import { StartProvaAlunoUseCase } from '@/use-case/prova-aluno/start';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function start(req: Request, res: Response) {
  const schema = z.object({
    provaId: z.coerce.number(),
    alunoId: z.coerce.number(),
  });

  const data = schema.parse(req.body);

  const useCase = makeUseCase(StartProvaAlunoUseCase, ProvaAlunoRepository);
  const result = await useCase.handler(data);

  return res.status(200).json(result);
}