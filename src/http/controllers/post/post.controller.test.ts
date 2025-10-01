import { createApp } from '@/app';
import { User } from '@/domain/entities/user.entity';
import { env } from '@/env';
import { appDataSource } from '@/lib/typeorm/typeorm';
import bcrypt from 'bcryptjs';
import type { Express } from 'express';
import request from 'supertest';

let app: Express;
let token: string;

describe('[HTTP] Post routes', () => {
  beforeAll(async () => {
    // 1) Garante secret de teste antes de criar o app
    env.JWT_SECRET = env.JWT_SECRET || 'test-secret';

    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }

    // Opcional: limpar bancos/seqs
    await appDataSource.query('PRAGMA foreign_keys=OFF;'); // sqlite


    // 2) Semeia um usuário válido com senha hasheada
    const userRepo = appDataSource.getRepository(User);
    const hash = await bcrypt.hash('123456', 10);
    const user = userRepo.create({
      login: 'teste',
      password: hash
    });
    await userRepo.save(user);

    // 3) Cria o app e faz login com senha em texto
    app = await createApp();

    const loginRes = await request(app)
      .post('/auth/login')
      .send({ login: 'teste', password: '123456' });

    expect(loginRes.status).toBe(200); // ajuda a detectar falhas cedo
    token = loginRes.body.token;
    expect(token).toBeTruthy();
  });

	afterAll(async () => {
		if (appDataSource.isInitialized) {
			await appDataSource.destroy();
		}
	});

	it('POST /post deve criar um post (201)', async () => {

		// cria uma pessoa
		const createdBy = {
			name: 'Teste',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'teste@example.com',
			status: true
		};
		const createdByResp = await request(app).post('/person').send(createdBy);
		const createdById = createdByResp.body.id;

		// cria um status
		const status = { name: 'Rascunho' };	
		const statusResp = await request(app).post('/post-status').set('Authorization', `Bearer ${token}`).send(status);
		const statusId = statusResp.body.id;

		// cria uma categoria
		const category = { name: 'Matemática' };	
		const categoryResp = await request(app).post('/category').set('Authorization', `Bearer ${token}`).send(category);
		const categoryId = categoryResp.body.id;

		const payload = {
		title: 'Meu Titulo',
		subtitle: 'Meu Subtitulo',
		message: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		image: 'asdfasdfasdfasdf',
		createdBy: createdById,
		category: categoryId,
		status: statusId
		};

    	const res = await request(app).post('/post').set('Authorization', `Bearer ${token}`).send(payload);

    	expect(res.status).toBe(201);
    	expect(res.body).toHaveProperty('id');

    	expect(res.body.title).toBe(payload.title);
  	});

	it('PUT /post deve atualizar um post (200)', async () => {

		// cria uma pessoa
		const createdBy = {
			name: 'Teste',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'teste@example.com',
			status: true
		};
		const createdByResp = await request(app).post('/person').send(createdBy);
		const createdById = createdByResp.body.id;

		// cria um status
		const status = { name: 'Rascunho' };	
		const statusResp = await request(app).post('/post-status').set('Authorization', `Bearer ${token}`).send(status);
		const statusId = statusResp.body.id;

		// cria uma categoria
		const category = { name: 'Matemática' };	
		const categoryResp = await request(app).post('/category').set('Authorization', `Bearer ${token}`).send(category);
		const categoryId = categoryResp.body.id;

		const payload = {
			title: 'Meu Titulo',
			subtitle: 'Meu Subtitulo',
			message: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
			image: 'asdfasdfasdfasdf',
			createdBy: createdById,
			category: categoryId,
			status: statusId
		};

    	const createResp = await request(app).post('/post').set('Authorization', `Bearer ${token}`).send(payload);

		// Agora vamos atualizar
		const id = createResp.body.id;

		// cria um status
		const status2 = { name: 'Rascunho' };	
		const statusResp2 = await request(app).post('/post-status').set('Authorization', `Bearer ${token}`).send(status2);
		const statusId2 = statusResp2.body.id;

		// cria uma categoria
		const category2 = { name: 'Matemática' };	
		const categoryResp2 = await request(app).post('/category').set('Authorization', `Bearer ${token}`).send(category2);
		const categoryId2 = categoryResp2.body.id;
		
		const update = {
			id: id,
			title: 'Meu Titulo Amarelo',
			subtitle: 'Meu Subtitulo Azul',
			message: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
			image: 'imagem.jpg',			
			category: categoryId2,
			status: statusId2,
			postedBy: createdById
		};
			
		const updateResp = await request(app).put(`/post/${id}`).set('Authorization', `Bearer ${token}`).send(update);
		
		const compareUpdate = {
			id: updateResp.body.id,
			title: updateResp.body.title,
			subtitle: updateResp.body.subtitle,
			message: updateResp.body.message,
			image: updateResp.body.image,			
			category: updateResp.body.category,
			status: updateResp.body.status,
			postedBy: updateResp.body.postedBy
		}

    	expect(updateResp.status).toBe(200);
    	expect(updateResp.body).toHaveProperty('id');
		expect(compareUpdate).toEqual(expect.objectContaining(update));

  	});

	it('GET /post deve retornar uma postagem (200)', async () => {
		
		// cria uma pessoa
		const createdBy = {
			name: 'Teste',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'teste@example.com',
			status: true
		};
		const createdByResp = await request(app).post('/person').send(createdBy);
		const createdById = createdByResp.body.id;

		// cria um status
		const status = { name: 'Rascunho' };	
		const statusResp = await request(app).post('/post-status').set('Authorization', `Bearer ${token}`).send(status);
		const statusId = statusResp.body.id;

		// cria uma categoria
		const category = { name: 'Matemática' };	
		const categoryResp = await request(app).post('/category').set('Authorization', `Bearer ${token}`).send(category);
		const categoryId = categoryResp.body.id;

		const payload = {
		title: 'Meu Titulo',
		subtitle: 'Meu Subtitulo',
		message: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		image: 'asdfasdfasdfasdf',
		createdBy: createdById,
		category: categoryId,
		status: statusId
		};

    	const postResp = await request(app).post('/post').set('Authorization', `Bearer ${token}`).send(payload);

    	const id = postResp.body.id;

		const getPostResp = await request(app).get(`/post/${id}`).set('Authorization', `Bearer ${token}`);
		
		expect(getPostResp.status).toBe(200);    
		expect(getPostResp.body).toEqual(expect.objectContaining(postResp.body));

	});


	it('GET /post deve retornar todas as postagens (200)', async () => {
		
		// cria uma pessoa
		const createdBy = {
			name: 'Teste',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'teste@example.com',
			status: true
		};
		const createdByResp = await request(app).post('/person').send(createdBy);
		const createdById = createdByResp.body.id;

		// cria um status
		const status = { name: 'Rascunho' };	
		const statusResp = await request(app).post('/post-status').set('Authorization', `Bearer ${token}`).send(status);
		const statusId = statusResp.body.id;

		// cria uma categoria
		const category = { name: 'Matemática' };	
		const categoryResp = await request(app).post('/category').set('Authorization', `Bearer ${token}`).send(category);
		const categoryId = categoryResp.body.id;

		const payload = {
		title: 'Meu Titulo',
		subtitle: 'Meu Subtitulo',
		message: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		image: 'asdfasdfasdfasdf',
		createdBy: createdById,
		category: categoryId,
		status: statusId
		};

    	const postResp = await request(app).post('/post').set('Authorization', `Bearer ${token}`).send(payload);
    	
		const getAllPostResp = await request(app).get(`/post`).set('Authorization', `Bearer ${token}`);
		
		expect(getAllPostResp.status).toBe(200);

	});
	


});
