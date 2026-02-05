import { PersonRepository } from '@/repositories/typeorm/person.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { FindAllUseCase } from '@/use-case/person/find-all'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function findAll(req: Request, res: Response) {
  
	const registerQuerySchema = z.object({
    	page: z.coerce.number().default(1),
    	limit: z.coerce.number().default(10),
  	})

  	const { page, limit } = registerQuerySchema.parse(req.query)
	
  	const findAllUseCase = makeUseCase(FindAllUseCase, PersonRepository)

  	const data = await findAllUseCase.handler(page, limit)

  	return res.status(200).json(data)
}
