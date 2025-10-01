// src/http/controllers/person/person.controller.test.ts
import { createApp } from '@/app';
import { Person } from '@/domain/entities/person.entity';
import { appDataSource } from '@/lib/typeorm/typeorm';
import { formatDate } from '@/utils/format-date';
import type { Express } from 'express';
import request from 'supertest';

let app: Express;

describe('[HTTP] PersonController', () => {
  beforeAll(async () => {
    // Inicializa a conexão apenas uma vez para todos os testes
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }
    
    // Cria o app apenas uma vez
    app = await createApp();
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
      const repository = appDataSource.getRepository(Person);
      await repository.clear();
    }
  });

  it('POST /person deve criar uma pessoa (201)', async () => {
    const payload = {
      name: 'Alice',
      cpf: '12345678901',
      birth: '1990-01-01',
      email: 'alice@example.com',
      status: true
    };

    const res = await request(app).post('/person').send(payload);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
	expect(res.body.name).toBe('Alice');
	expect(res.body.cpf).toBe('12345678901');
	expect(formatDate(res.body.birth)).toBe('1990-01-01');
	expect(res.body.email).toBe('alice@example.com');
	expect(res.body.status).toBe(true);    

  });
  
  it('PUT /person deve atualizar uma pessoa (200)', async () => {

	 const create = {
      name: 'Alice',
      cpf: '12345678901',
      birth: '1990-01-01',
      email: 'alice@example.com',
      status: true
    };

    const createResp = await request(app).post('/person').send(create);

	const id = createResp.body.id;

	const update = {
		id: id,
		name: 'Alice Maria',
      	cpf: '12345678888',
      	birth: '1990-10-01',
      	email: 'alice.maria@example.com',
      	status: true
    };
    
    const res = await request(app).put(`/person/${id}`).send(update);
    
	expect(res.status).toBe(200);

	const respUpdate = {
		id: res.body.id,
		name: res.body.name,
      	cpf: res.body.cpf,
      	birth: formatDate(res.body.birth),
      	email: res.body.email,
      	status: res.body.status
	}

	expect(respUpdate).toEqual(expect.objectContaining(update));

  });

  it('GET /person deve retornar a pessoa (200)', async () => {
    
	const create = {
		name: 'Bob',
      	cpf: '22222222222',
      	birth: '1985-05-20',
      	email: 'bob@example.com',
      	status: true
    }
	
	const createRes = await request(app).post('/person').send(create);
    const id = createRes.body.id;

    const updateRes = await request(app).get(`/person/${id}`);
   
    expect(updateRes.status).toBe(200);    
	expect(updateRes.body).toEqual(expect.objectContaining(createRes.body));

  });

  it('GET /person deve retornar todas as pessoas (200)', async () => {

	const create = {
		name: 'Bob',
		cpf: '22222222222',
		birth: '1985-05-20',
		email: 'bob@example.com',
		status: true
    }
	
	await request(app).post('/person').send(create);
        
    const resp = await request(app).get(`/person`);
    expect(resp.status).toBe(200);
    
  });

});