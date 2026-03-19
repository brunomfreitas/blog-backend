import { QuestaoRepository } from '@/repositories/typeorm/questao.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { DeleteQuestaoUseCase } from '@/use-case/questao/delete-post'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function deletePost(req: Request, res: Response) {
  
	const registerParamsSchema = z.object({
    	id: z.coerce.number(),
  	})

  	const { id } = registerParamsSchema.parse(req.params)

  	const deleteUseCase = makeUseCase(DeleteQuestaoUseCase, QuestaoRepository)

	const data = await deleteUseCase.handler(id)

	return res.status(200).json(data)

}
