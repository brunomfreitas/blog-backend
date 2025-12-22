// src/use-case/user/user-dto.ts
export type CreatePostDTO = {   
  title: string
  subtitle: string
  message: string
  image: string
//   createdAt: Date
  createdBy: number
  category: number
  status: number
}

export type UpdatePostDTO = {
  title: string
  subtitle: string
  message: string
  image: string  
  postedAt?: Date | undefined
  postedBy?: number | undefined
  category: number
  status: number
}
