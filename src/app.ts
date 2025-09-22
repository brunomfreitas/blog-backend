// src/app.ts
import express from 'express';
import categoryRoutes from './http/controllers/category/routes';
import personRoutes from './http/controllers/person/routes';
import postStatusRoutes from './http/controllers/post-status/routes';
import postRoutes from './http/controllers/post/routes';
import userRoutes from './http/controllers/user/routes';
import { appDataSource } from './lib/typeorm/typeorm';

export const createApp = async () => {
	await appDataSource.initialize();

	const app = express();
	app.use(express.json());

	app.use('/person', personRoutes);
	app.use('/user', userRoutes);
	app.use('/post', postRoutes);
	app.use('/category', categoryRoutes);
	app.use('/post-status', postStatusRoutes);

	return app;
};
