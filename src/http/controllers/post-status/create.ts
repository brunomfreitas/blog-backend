import { PostStatusRepository } from "@/repositories/typeorm/post-status.repository";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { CreateUseCase } from "@/use-case/post-status/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response) {

	const registerBodySchema = z.object({    
		name: z.string()
	})

	const { name } = registerBodySchema.parse(req.body)
	
	const createUseCase = makeUseCase(CreateUseCase, PostStatusRepository);

	const data = await createUseCase.handler({ name: name, status: true })

	return res.status(201).json(data)
}
