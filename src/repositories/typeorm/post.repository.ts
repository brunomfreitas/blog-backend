// src/repositories/typeorm/user.repository.ts
import { Category } from '@/domain/entities/category.entity'
import { Person } from '@/domain/entities/person.entity'
import { PostStatus } from '@/domain/entities/post-status.entity'
import { Post } from '@/domain/entities/post.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { CreatePostDTO, UpdatePostDTO } from '@/use-case/post/post-dtos'
import { ILike, Repository } from 'typeorm'

export class PostRepository {
  private repository: Repository<Post>
  private createdByRepo: Repository<Person>
  private postedByRepo: Repository<Person>
  private postStatusRepo: Repository<PostStatus>
  private postCategoryRepo: Repository<Category>

  constructor() {
    this.repository = appDataSource.getRepository(Post)
    this.createdByRepo = appDataSource.getRepository(Person)
	this.postedByRepo = appDataSource.getRepository(Person)
	this.postStatusRepo = appDataSource.getRepository(PostStatus)
  	this.postCategoryRepo = appDataSource.getRepository(Category)
  }

  async findAll(page: number, limit: number): Promise<Post[]> {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['createdByPerson', 'postedByPerson', 'postStatus', 'postCategory'],
    })
  }

  async findById(id: number): Promise<Post | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['createdByPerson', 'postedByPerson', 'postStatus', 'postCategory'],
    })
  }

  async create(data: CreatePostDTO): Promise<Post> {
    
	const creator = await this.createdByRepo.findOne({ where: { id: data.createdBy } })
	const postStatus = await this.postStatusRepo.findOne({ where: { id: data.status } })
	const PostCategory = await this.postCategoryRepo.findOne({ where: { id: data.category } })
    
	if (!creator) throw new Error('Person not found')

    const { title, subtitle, message, image, createdAt } = data

    const entity = this.repository.create(data)

    return this.repository.save(entity)
  }

	async update(data: UpdatePostDTO): Promise<Post> {

		const partial: Partial<Post> = {
			id: data.id,
			title: data.title,
			subtitle: data.subtitle,
			message: data.message,
			image: data.image,
			category: data.category as any, // se for enum numérico
			postedAt: data.postedAt,
			status: data.status,
		}

		
		if (data.postedBy === null) {  
			partial.postedByPerson = null
		} else if (typeof data.postedBy === 'number') {
		
		// (B) validando existência:
		const person = await this.postedByRepo.findOne({ where: { id: data.postedBy } })
			if (!person) throw new Error('Person not found')
				partial.postedByPerson = person
		}

		const entity = await this.repository.preload(partial)
		if (!entity) throw new Error('Post not found') // id inexistente

    	return this.repository.save(entity)
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete(id)
	}

	async search(q: string, page: number, limit: number) {
		const where = [
			{ title: ILike(`%${q}%`) },
			{ message: ILike(`%${q}%`) },
		];

		const [rows, total] = await this.repository.findAndCount({
		where,
		relations: ["createdByPerson", "postedByPerson", "postStatus", "postCategory"],
		order: { createdAt: "DESC" },
		skip: (page - 1) * limit,
		take: limit,
		});

    	return { data: rows, total };
  	}
	
}