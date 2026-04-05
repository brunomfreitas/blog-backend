import { ProvaRepository } from '@/repositories/typeorm/prova.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { FindUseCase } from '@/use-case/prova/find'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function find(req: Request, res: Response) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const querySchema = z.object({
    alunoId: z.coerce.number().optional(),
  })

  const { id } = paramsSchema.parse(req.params)
  const { alunoId } = querySchema.parse(req.query)

  const useCase = makeUseCase(FindUseCase, ProvaRepository)
  const prova = await useCase.handler(id, alunoId)

  return res.status(200).json(prova)
}