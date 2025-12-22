import { requireAuth } from "@/http/middlewares/require-auth";
import { Router } from "express";
import { create } from "./create";
import { find } from "./find";
import { findAll } from "./find-all";
import { update } from "./update";

const categoryRoutes = Router();

categoryRoutes.get('/', findAll)

categoryRoutes.post("/", requireAuth, create);
categoryRoutes.get('/:id', requireAuth, find)
categoryRoutes.put('/', requireAuth, update)

export default categoryRoutes;
