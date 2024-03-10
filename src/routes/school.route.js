import { Router } from "express";
const router = Router();

import { create, getAll } from "../controllers/school.controller.js";

router.get("/", getAll);
router.post("/", create);

export default router;