export interface IPost {
  id?: number
  title: string | null
  subtitle: string | null
  message: string
  image: string | null
  createdAt: Date
  createdBy: number
  postedAt?: Date | null
  postedBy?: number | null
  category: number
  status: number
}
