// src/use-case/user/user-dto.ts
export type CreatePostDTO = {   
  title: string
  subtitle: string
  message: string
  image?: string | null
  createdBy: number
  category: number
  status: number
}

export type UpdatePostDTO = {
  title: string
  subtitle?: string | undefined
  message: string
  image?: string | null 
  postedAt?: Date | undefined
  postedBy?: number | undefined
  category: number
  status: number
}
