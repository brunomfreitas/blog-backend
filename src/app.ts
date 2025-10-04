// src/app.ts
import express from 'express';
import AuthRouter from './http/controllers/auth/auth.controller';
import categoryRoutes from './http/controllers/category/routes';
import personRoutes from './http/controllers/person/routes';
import postStatusRoutes from './http/controllers/post-status/routes';
import postRoutes from './http/controllers/post/routes';
import userRoutes from './http/controllers/user/routes';
import { requireAuth } from './http/middlewares/require-auth';
import { appDataSource } from './lib/typeorm/typeorm';

export const createApp = async () => {
	await appDataSource.initialize();

	const app = express();
	app.use(express.json());

	
	
	app.use('/post', postRoutes);
	app.use('/auth', AuthRouter);

	app.use(requireAuth);

	app.use('/user', userRoutes);
	app.use('/person', personRoutes);	
	app.use('/category', categoryRoutes);
	app.use('/post-status', postStatusRoutes);
	

	return app;
};
