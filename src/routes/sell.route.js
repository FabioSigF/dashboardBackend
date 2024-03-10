import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  updateById,
} from "../controllers/sell.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", findAll);
router.post("/", create);
router.patch("/", updateById);

export default router;
