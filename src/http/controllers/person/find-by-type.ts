import { PersonRepository } from '@/repositories/typeorm/person.repository'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { FindByTypeUseCase } from '@/use-case/person/find-by-type'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function findByType(req: Request, res: Response) {
  
	const registerParamsSchema = z.object({
    	type: z.string(),
  	});

  	const { type } = registerParamsSchema.parse(req.params);

	const findByTypeUseCase = makeUseCase(FindByTypeUseCase, PersonRepository)

  	const data = await findByTypeUseCase.handler(type);

  	return res.status(200).json(data);
}
