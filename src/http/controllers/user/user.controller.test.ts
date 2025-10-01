// src/http/controllers/person/person.controller.test.ts
import { createApp } from '@/app';
import { User } from '@/domain/entities/user.entity';
import { env } from '@/env';
import { appDataSource } from '@/lib/typeorm/typeorm';
import bcrypt from 'bcryptjs';
import type { Express } from 'express';
import request from 'supertest';

let app: Express;
let token: string;

describe('[HTTP] CategoryController', () => {

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
      const repository = appDataSource.getRepository(User);
      await repository.clear();
    }
  });

	it('POST /user deve criar um usuário (201)', async () => {
    
		const person = {
			name: 'Teste',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'teste@example.com',
			status: true
		};
		
		const personResp = await request(app).post('/person').send(person);
		
		const personId = personResp.body.id;
		
		const payload = {	
			login: "teste.user",
			password: "123456",
			personid: personId
		};

		const res = await request(app).post('/user').set('Authorization', `Bearer ${token}`).send(payload);

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('id');
		expect(res.body.login).toBe('teste.user');
		expect(res.body.password).toBe('123456');
		expect(res.body.personid).toBe(personId);

	});
  
  it('PUT /user deve atualizar um usuário', async () => {

		const person = {
			name: 'Teste',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'teste@example.com',
			status: true
		};
		
		const personResp = await request(app).post('/person').send(person);
		
		const personId = personResp.body.id;
		
		const payload = {	
			login: "teste.user",
			password: "123456",
			personid: personId
		};

		const userResp = await request(app).post('/user').set('Authorization', `Bearer ${token}`).send(payload);

		const id = userResp.body.id;

		const update = {
			id: id,
			login: "teste.user.teste",
			password: "654321",
			personid: personId
		};
		
		const res = await request(app).put(`/user`).set('Authorization', `Bearer ${token}`).send(update);
		
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('id');
		expect(res.body).toEqual(expect.objectContaining(update));


	});

	it('GET /user deve retornar um usuário (200)', async () => {

		const person = {
			name: 'Teste',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'teste@example.com',
			status: true
		};
		
		const personResp = await request(app).post('/person').send(person);
		
		const personId = personResp.body.id;
		
		const payload = {	
			login: "teste.user",
			password: "123456",
			personid: personId
		};

		const userResp = await request(app).post('/user').set('Authorization', `Bearer ${token}`).send(payload);

		const id = userResp.body.id;

		const findRes = await request(app).get(`/user/${id}`).set('Authorization', `Bearer ${token}`);

		expect(findRes.status).toBe(200);    
		expect(findRes.body).toEqual(expect.objectContaining(userResp.body));

	});

	it('GET /user deve retornar todos os usuário (200)', async () => {
    
		const person = {
			name: 'Teste',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'teste@example.com',
			status: true
		};
		
		const personResp = await request(app).post('/person').send(person);
		
		const personId = personResp.body.id;
		
		const payload = {	
			login: "teste.user",
			password: "123456",
			personid: personId
		};

		const userResp = await request(app).post('/user').set('Authorization', `Bearer ${token}`).send(payload);
		
		const findRes = await request(app).get(`/user`).set('Authorization', `Bearer ${token}`);
	
		expect(findRes.status).toBe(200);

  	});

});