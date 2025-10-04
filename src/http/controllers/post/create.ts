import { PostRepository } from "@/repositories/typeorm/post.repository";
import { makeUseCase } from "@/use-case/factory/make-use-case";
import { CreateUseCase } from "@/use-case/post/create";
import { CreatePostDTO } from "@/use-case/post/post-dtos";
import { Request, Response } from "express";
import { z } from 'zod';


const registerBodySchema = z.object({
	title: z.string().min(1),
	subtitle: z.string(),
	message: z.string().min(1),
	image: z.string(),
	// createdAt: z.coerce.date(),
	createdBy: z.coerce.number(),
	category: z.coerce.number(),
	status: z.coerce.number()
})

export async function create(req: Request, res: Response) {

	const data: CreatePostDTO = registerBodySchema.parse(req.body);
	
	const createPostUseCase = makeUseCase(CreateUseCase, PostRepository);

	const post = await createPostUseCase.handler(data)

	return res.status(201).json(post)
}
