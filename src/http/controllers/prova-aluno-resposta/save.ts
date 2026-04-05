import { ProvaAlunoRespostaRepository } from '@/repositories/typeorm/prova-aluno-resposta.repository';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function saveMany(req: Request, res: Response) {
  const schema = z.array(
    z.object({
      provaAlunoId: z.coerce.number(),
      questaoId: z.coerce.number(),
      alternativaId: z.coerce.number().nullable().optional(),
      respostaLetra: z.string().max(1).nullable().optional(),
      correta: z.boolean().nullable().optional(),
    })
  );

  const data = schema.parse(req.body);

  const repository = new ProvaAlunoRespostaRepository();
  const result = await repository.saveMany(data);

  return res.status(200).json(result);
}