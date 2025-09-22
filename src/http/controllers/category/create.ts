import { CategoryRepository } from "@/repositories/typeorm/category.repository";
import { CreateUseCase } from "@/use-case/category/create";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response) {

	const registerBodySchema = z.object({    
		name: z.string()
	})

	const { name } = registerBodySchema.parse(req.body)
	
	const createUseCase = makeUseCase(CreateUseCase, CategoryRepository);

	const person = await createUseCase.handler({		
		name: name,
		status: true
	})

	return res.status(201).json(person)
}
