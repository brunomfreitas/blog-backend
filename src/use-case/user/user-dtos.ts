// src/use-case/user/user-dto.ts
export type CreateUserDTO = {
  personid: number
  login: string
  password: string
  status?: boolean
}

export type UpdateUserDTO = {
  id: number
  personid?: number
  login?: string
  password?: string
  status?: boolean
}
