import { requireAuth } from "@/http/middlewares/require-auth";
import { Router } from "express";
import { create } from "./create";
import { deletePost } from "./delete";
import { find } from "./find";
import { list } from "./list";
import { listAll } from "./list-all";
import { search } from "./search";
import { update } from "./update";

const postRoutes = Router();

postRoutes.get('/search', search)
postRoutes.get('/', list)

postRoutes.post('/', requireAuth, create);
postRoutes.post('/all', requireAuth, listAll);
postRoutes.get('/:id', requireAuth, find)
postRoutes.put('/', requireAuth, update)
postRoutes.delete('/:id', requireAuth, deletePost)

export default postRoutes;