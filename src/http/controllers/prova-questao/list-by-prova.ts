import { ProvaQuestaoRepository } from '@/repositories/typeorm/prova-questao.repository';
import { makeUseCase } from '@/use-case/factory/make-use-case';
import { ListByProvaUseCase } from '@/use-case/prova-questao/list-by-prova';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function listByProva(req: Request, res: Response) {
  const schema = z.object({
    provaId: z.coerce.number(),
  });

  const { provaId } = schema.parse(req.params);

  const useCase = makeUseCase(ListByProvaUseCase, ProvaQuestaoRepository);
  const result = await useCase.handler(provaId);

  return res.status(200).json(result);
}