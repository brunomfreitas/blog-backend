import { Router } from "express";
import { create } from "./create";
import { find } from "./find";
import { findAll } from "./find-all";
import { findByType } from "./find-by-type";
import { search } from "./search";
import { update } from "./update";

const personRoutes = Router();

personRoutes.get('/search', search);
personRoutes.post("/", create);
personRoutes.get('/', findAll)
personRoutes.get('/:id', find)
personRoutes.get('/type/:type', findByType)
personRoutes.put('/:id', update)

export default personRoutes;
