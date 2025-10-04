// post.entity.ts
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId,
} from 'typeorm'
import { Category } from './category.entity'
import { Person } from './person.entity'
import { PostStatus } from './post-status.entity'

@Entity({ schema: 'blog', name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'title', type: 'varchar' })
  title!: string

  @Column({ name: 'subtitle', type: 'varchar', nullable: true })
  subtitle!: string | null

  @Column({ name: 'message', type: 'text' }) // (sugestão: "message")
  message!: string

  @Column({ name: 'image', type: 'text', nullable: true })
  image!: string | null

  @Column({ name: 'createdat', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date

  @Column({ name: 'postedat', type: 'timestamp', nullable: true })
  postedAt!: Date | null

  // ===== Relacionamentos =====

  // quem criou o post
  @ManyToOne(() => Person, { nullable: false, eager: false })
  @JoinColumn({ name: 'createdby', referencedColumnName: 'id' })
  createdByPerson!: Person

  // expõe o ID sem precisar de join
  @RelationId((post: Post) => post.createdByPerson)
  createdBy!: number

  // quem publicou/aprovou o post
  @ManyToOne(() => Person, { nullable: true, eager: false })
  @JoinColumn({ name: 'postedby', referencedColumnName: 'id' })
  postedByPerson!: Person | null

  // expõe o ID sem precisar de join
  @RelationId((post: Post) => post.postedByPerson)
  postedBy!: number | null

  // quem publicou/aprovou o post
  @ManyToOne(() => Category, { nullable: true, eager: false })
  @JoinColumn({ name: 'category', referencedColumnName: 'id' })
  postCategory: Category

  // expõe o ID sem precisar de join
  @RelationId((post: Post) => post.postCategory)
  category!: number

  // quem publicou/aprovou o post
  @ManyToOne(() => PostStatus, { nullable: true, eager: false })
  @JoinColumn({ name: 'post_status', referencedColumnName: 'id' })
  postStatus: PostStatus

  // expõe o ID sem precisar de join
  @RelationId((post: Post) => post.postStatus)
  status!: number

}

@Index('idx_post_createdby', ['createdBy'])
@Index('idx_post_postedby', ['postedBy'])
@Index('idx_post_category', ['category'])
@Entity()
class _IdxHack {} // (opcional: crie os índices direto via migration)
