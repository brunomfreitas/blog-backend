// src/http/controllers/person/person.controller.test.ts
import { createApp } from '@/app';
import { PostStatus } from '@/domain/entities/post-status.entity';
import { User } from '@/domain/entities/user.entity';
import { env } from '@/env';
import { appDataSource } from '@/lib/typeorm/typeorm';
import bcrypt from 'bcryptjs';
import type { Express } from 'express';
import request from 'supertest';

let app: Express;
let token: string;

describe('[HTTP] PostStatusController', () => {

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
    // Fecha a conexão após todos os testes
    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
    }
  });

  beforeEach(async () => {
    // Limpa os dados antes de cada teste
    if (appDataSource.isInitialized) {
      const repository = appDataSource.getRepository(PostStatus);
      await repository.clear();
    }
  });

	it('POST /post-status deve criar um status (201)', async () => {
    
		const payload = { name: 'Rascunho' };

		const res = await request(app)
			.post('/post-status')
			.set('Authorization', `Bearer ${token}`)
			.send(payload);

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('id');
		expect(res.body.name).toBe('Rascunho');

	});
  
  it('PUT /post-status deve atualizar um status', async () => {

	 const create = { name: 'Rascunho' };

    const createResp = await request(app)
		.post('/post-status')
		.set('Authorization', `Bearer ${token}`)
		.send(create);

	const id = createResp.body.id;

	const update = {
		id: id,
		name: 'Em Avaliação',
    };
    
    const res = await request(app)
		.put(`/post-status`)
		.set('Authorization', `Bearer ${token}`)
		.send(update);
    
	expect(res.status).toBe(200);
	expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Em Avaliação');

  });

  it('GET /post-status deve retornar um status (200)', async () => {
    
	const create = { name: 'Rascunho' }
	
	const createRes = await request(app)
		.post('/post-status')
		.set('Authorization', `Bearer ${token}`)
		.send(create);

    const id = createRes.body.id;

    const findRes = await request(app)
		.get(`/post-status/${id}`)
		.set('Authorization', `Bearer ${token}`);
   
    expect(findRes.status).toBe(200);    
	expect(findRes.body).toEqual(expect.objectContaining(createRes.body));

  });

  it('GET /post-status deve retornar todos os status (200)', async () => {

	const create = { name: 'Rascunho' }
	
	await request(app)
		.post('/post-status')
		.set('Authorization', `Bearer ${token}`)
		.send(create);
        
    const resp = await request(app).get(`/post-status`).set('Authorization', `Bearer ${token}`);
    expect(resp.status).toBe(200);
    
  });

});