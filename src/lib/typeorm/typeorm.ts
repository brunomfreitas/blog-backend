import { Category } from '@/domain/entities/category.entity';
import { Person } from '@/domain/entities/person.entity';
import { PostStatus } from '@/domain/entities/post-status.entity';
import { Post } from '@/domain/entities/post.entity';
import { User } from '@/domain/entities/user.entity';
import { env } from '@/env';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [Person, User, Post, PostStatus, Category],
  logging: env.NODE_ENV === 'development',
})

appDataSource
  .initialize()
  .then(() => {
    console.log('Database with typeorm connected')
  })
  .catch((error) => {
    console.error('Error connecting to database with typeorm', error)
  })
