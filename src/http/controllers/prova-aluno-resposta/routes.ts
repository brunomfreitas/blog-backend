import { Router } from 'express'
import { saveMany } from './save'

const provaAlunoRespostaRoutes = Router()

provaAlunoRespostaRoutes.post('/save-many', saveMany)

export default provaAlunoRespostaRoutes