import { Router } from "express";
const router = Router();

import { create, getAll } from "../controllers/company.controller.js";

router.get("/", getAll);
router.post("/", create);

export default router;