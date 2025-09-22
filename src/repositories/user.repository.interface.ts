import { IUser } from "@/domain/interfaces/user.interface";
import { CreateUserDTO, UpdateUserDTO } from "@/use-case/user/user-dtos";

export interface IUserRepository {  
  findAll(page: number, limit: number): Promise<IUser[]>
  findById(id: number): Promise<IUser | null>
  create(data: CreateUserDTO): Promise<IUser>
  update(data: UpdateUserDTO): Promise<IUser>
  delete(id: number): Promise<void>
}
