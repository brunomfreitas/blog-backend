import { requireAuth } from "@/http/middlewares/require-auth";
import { Router } from "express";
import { create } from "./create";
import { deletePost } from "./delete";
import { find } from "./find";
import { list } from "./list";
import { listAll } from "./list-all";
import { search } from "./search";
import { update } from "./update";

const questaoRoutes = Router();

questaoRoutes.get('/search', search)
questaoRoutes.get('/', list)
questaoRoutes.get('/all', requireAuth, listAll);
questaoRoutes.post('/', requireAuth, create);
questaoRoutes.put('/:id', requireAuth, update)
questaoRoutes.delete('/:id', requireAuth, deletePost)
questaoRoutes.get('/:id', find)

export default questaoRoutes;