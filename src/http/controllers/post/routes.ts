import { Router } from "express";
import { create } from "./create";
import { find } from "./find";
import { findAll } from "./find-all";
import { search } from "./search";
import { update } from "./update";

const postRoutes = Router();

postRoutes.post("/", create);
postRoutes.get('/search', search)
postRoutes.get('/', findAll)
postRoutes.get('/:id', find)
postRoutes.put('/', update)


export default postRoutes;
