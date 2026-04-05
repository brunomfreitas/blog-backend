import { ProvaQuestaoRepository } from '@/repositories/typeorm/prova-questao.repository';
import { makeUseCase } from '@/use-case/factory/make-use-case';
import { CreateManyProvaQuestaoUseCase } from '@/use-case/prova-questao/create';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function create(req: Request, res: Response) {
  const schema = z.array(
    z.object({
      provaId: z.coerce.number(),
      questaoId: z.coerce.number(),
      numeroQuestao: z.coerce.number(),
    })
  );

  const data = schema.parse(req.body);

  const useCase = makeUseCase(CreateManyProvaQuestaoUseCase, ProvaQuestaoRepository);
  const result = await useCase.handler(data);

  return res.status(201).json(result);
}