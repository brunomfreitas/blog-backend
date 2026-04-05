import { ProvaQuestaoRepository } from '@/repositories/typeorm/prova-questao.repository';
import { makeUseCase } from '@/use-case/factory/make-use-case';
import { DeleteByProvaUseCase } from '@/use-case/prova-questao/delete-by-prova';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function deleteByProva(req: Request, res: Response) {
  const schema = z.object({
    provaId: z.coerce.number(),
  });

  const { provaId } = schema.parse(req.params);

  const useCase = makeUseCase(DeleteByProvaUseCase, ProvaQuestaoRepository);
  await useCase.handler(provaId);

  return res.status(200).json({ message: 'Questões da prova removidas com sucesso.' });
}