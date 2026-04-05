import { AlternativasRepository } from '@/repositories/typeorm/alternativas.repository'
import { DeleteAlternativasUseCase } from '@/use-case/alternativas/delete'
import { makeUseCase } from '@/use-case/factory/make-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function deleteAlternativa(req: Request, res: Response) {
  
	const registerParamsSchema = z.object({
    	id: z.coerce.number(),
  	});

  	const { id } = registerParamsSchema.parse(req.params);
  	const deleteUseCase = makeUseCase(DeleteAlternativasUseCase, AlternativasRepository);
	const data = await deleteUseCase.handler(id);
	
	return res.status(200).json(data);
}
