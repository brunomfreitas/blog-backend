import { ProvaRepository } from '@/repositories/typeorm/prova.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { ListUseCase } from '@/use-case/prova/list'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function list(req: Request, res: Response) {
  const registerQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    alunoId: z.coerce.number().optional(),
    status: z.string().optional(),
  })

  const { page, limit, alunoId, status } = registerQuerySchema.parse(req.query)

  const listUseCase = makeUseCase(ListUseCase, ProvaRepository)
  const data = await listUseCase.handler(page, limit, alunoId, status)

  return res.status(200).json(data)
}