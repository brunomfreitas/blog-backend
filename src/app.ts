// src/app.ts
import express from 'express';
import AuthRouter from './http/controllers/auth/auth.controller';
import categoryRoutes from './http/controllers/category/routes';
import personRoutes from './http/controllers/person/routes';
import postStatusRoutes from './http/controllers/post-status/routes';
import postRoutes from './http/controllers/post/routes';
import userRoutes from './http/controllers/user/routes';
import { requireAuth } from './http/middlewares/require-auth';
import { setupSwagger } from './lib/swagger/setup-swagger';
import { appDataSource } from './lib/typeorm/typeorm';

import cors from "cors";



export const createApp = async () => {
	
	if (!appDataSource.isInitialized) {
    	await appDataSource.initialize();
  	}
  
	const app = express();
	app.use(express.json());
	
	app.use(
		cors({
			origin: "http://localhost:5173",
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
	

	return app;
};
