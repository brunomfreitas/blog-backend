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
postRoutes.get('/all', requireAuth, listAll);
postRoutes.post('/', requireAuth, create);
postRoutes.put('/:id', requireAuth, update)
postRoutes.delete('/:id', requireAuth, deletePost)
postRoutes.get('/:id', find)

export default postRoutes;