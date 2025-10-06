// src/repositories/typeorm/user.repository.ts
import { Category } from '@/domain/entities/category.entity'
import { Person } from '@/domain/entities/person.entity'
import { PostStatus } from '@/domain/entities/post-status.entity'
import { Post } from '@/domain/entities/post.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { CreatePostDTO, UpdatePostDTO } from '@/use-case/post/post-dtos'
import { ILike, MoreThan, Repository } from 'typeorm'

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

  async list(page: number, limit: number): Promise<Post[]> {
	const now = new Date();

    return this.repository.find({
		where: {			
			postStatus: { name: "Publicado" },
			postedAt: MoreThan(now),
		},
	    order: { postedAt: 'DESC', id: 'DESC' },
      	relations: ['createdByPerson', 'postedByPerson', 'postStatus', 'postCategory'],
		skip: (page - 1) * limit,
      	take: limit,
    })
  }

  async listAll(page: number, limit: number): Promise<Post[]> {
    return this.repository.find({
		order: { id: 'DESC' },
      	relations: ['createdByPerson', 'postedByPerson', 'postStatus', 'postCategory'],
	  	skip: (page - 1) * limit,
    	take: limit,
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
	const postCategory = await this.postCategoryRepo.findOne({ where: { id: data.category } })
    
	if (!creator) throw new Error('Person not found')
		
	if (!postStatus) throw new Error('Status not found')

	if (!postCategory) throw new Error('Category not found')
    
	const post = {		
		title: data.title,
		subtitle: data.subtitle,
		message: data.message,
		image: data.image,
		createdBy: data.createdBy,
		createdByPerson: creator,
		postCategory: postCategory,
		category: data.category,
		postStatus: postStatus,
		status: data.status,
	}

    const entity = this.repository.create(post)

    return this.repository.save(entity)
  }

	async update(data: UpdatePostDTO): Promise<Post> {

		const postedByPerson = await this.createdByRepo.findOne({ where: { id: data.postedBy } })
		const postStatus = await this.postStatusRepo.findOne({ where: { id: data.status } })
		const postCategory = await this.postCategoryRepo.findOne({ where: { id: data.category } })

		const partial: Partial<Post> = {
			id: data.id,
			title: data.title,
			subtitle: data.subtitle,
			message: data.message,
			image: data.image,
			postedBy: data.postedBy,
			postedByPerson: postedByPerson,
			category: data.category,
			postCategory: postCategory,
			postedAt: data.postedAt,
			status: data.status,
			postStatus: postStatus
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
		const now = new Date();

		const where = [
			{ title: ILike(`%${q}%`) },
			{ message: ILike(`%${q}%`) },
			{ subtitle: ILike(`%${q}%`) }, // se quiser incluir também o subtitle
		];

		const [rows, total] = await this.repository.findAndCount({
			where: where.map((condition) => ({
			...condition,
			postStatus: { name: "Publicado" }, // filtra pelo nome
			postedAt: MoreThan(now),           // postedAt > agora
			})),
			relations: ["createdByPerson", "postedByPerson", "postStatus", "postCategory"],
			order: { createdAt: "DESC" },
			skip: (page - 1) * limit,
			take: limit,
		});

		return { data: rows, total };
	}

	
}