// src/app.ts
import cors from "cors";
import express from 'express';
import alternativasRoutes from './http/controllers/alternativas/routes';
import AuthRouter from './http/controllers/auth/auth.controller';
import categoryRoutes from './http/controllers/category/routes';
import personRoutes from './http/controllers/person/routes';
import postStatusRoutes from './http/controllers/post-status/routes';
import postRoutes from './http/controllers/post/routes';
import provaAlunoRespostaRoutes from "./http/controllers/prova-aluno-resposta/routes";
import provaAlunoRoutes from "./http/controllers/prova-aluno/routes";
import provaQuestaoRoutes from "./http/controllers/prova-questao/routes";
import provaRoutes from "./http/controllers/prova/routes";
import questaoRoutes from './http/controllers/questao/routes';
import userRoutes from './http/controllers/user/routes';
import { requireAuth } from './http/middlewares/require-auth';
import { setupSwagger } from './lib/swagger/setup-swagger';
import { appDataSource } from './lib/typeorm/typeorm';

export const createApp = async () => {
	
	if (!appDataSource.isInitialized) {
    	await appDataSource.initialize();
  	}
  
	const app = express();
	app.use(express.json());
	
	app.use(
		cors({
			origin: ["http://localhost:5173","http://localhost:8081"],
			methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization"],
		})
	);

	setupSwagger(app);

	app.use('/post', postRoutes);
	app.use('/auth', AuthRouter);
	app.use('/category', categoryRoutes);

	app.use(requireAuth);

	app.use('/user', userRoutes);
	app.use('/person', personRoutes);
	app.use('/post-status', postStatusRoutes);
	app.use('/questao', questaoRoutes);
	app.use('/alternativas', alternativasRoutes);
	app.use('/prova', provaRoutes);
	app.use('/prova-aluno', provaAlunoRoutes);
	app.use('/prova-aluno-resposta', provaAlunoRespostaRoutes);
	app.use('/prova-questao', provaQuestaoRoutes);
	
	return app;
};
