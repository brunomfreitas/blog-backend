// src/http/controllers/auth.controller.ts
import { Person } from '@/domain/entities/person.entity'
import { User } from '@/domain/entities/user.entity'
import { requireAuth } from '@/http/middlewares/require-auth'
import { hashPassword, verifyPassword } from '@/lib/auth/crypto'
import { signToken } from '@/lib/auth/jwt'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Request, Response, Router } from 'express'
import { z } from 'zod'

const AuthRouter = Router()
const userRepo = appDataSource.getRepository(User)
const personRepo = appDataSource.getRepository(Person)

// -------- register --------
const registerSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
  personId: z.coerce.number().int().positive(),
})

AuthRouter.post('/register', async (req: Request, res: Response) => {

  const { login, password, personId } = registerSchema.parse(req.body)

  const exists = await userRepo.findOne({ where: { login } })
  if (exists) return res.status(409).json({ message: 'Login already in use' })

  const person = await personRepo.findOne({ where: { id: personId } })
  if (!person) return res.status(404).json({ message: 'Person not found' })

  const passwordHash = await hashPassword(password)

  const user = userRepo.create({
    login,
    password: passwordHash,
    status: true,
    person, // <- define a relação
  })
  await userRepo.save(user)

  const token = signToken({ sub: user.id, pid: person.id, login: user.login })

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      login: user.login,
      personId: person.id,
    },
  })
})

// -------- login --------
const loginSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
})

AuthRouter.post('/login', async (req: Request, res: Response) => {
  const { login, password } = loginSchema.parse(req.body)

  const user = await userRepo.findOne({
    where: { login },
    relations: ['person'], // carrega a relação (para personId via RelationId)
  })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const ok = await verifyPassword(password, user.password)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

  const token = signToken({ sub: user.id, pid: user.personid, login: user.login })

  return res.json({
    token,
    user: {
      id: user.id,
      login: user.login,
      personId: user.personid,
    },
  })
})

// -------- me --------
AuthRouter.get('/me', requireAuth, async (req: Request, res: Response) => {
  const { sub: userId } = (req as any).user as { sub: number; pid: number; login: string }

  const user = await userRepo.findOne({
    where: { id: userId },
    relations: ['person'],
  })
  if (!user) return res.status(404).json({ message: 'User not found' })

  return res.json({
    id: user.id,
    login: user.login,
    personId: user.personid,
    person: user.person
      ? { id: user.person.id, name: user.person.name, email: (user.person as any).email ?? null }
      : null,
  })
})

export default AuthRouter; // <- facilita importar como default
