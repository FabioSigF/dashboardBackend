import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  findByDate,
  updateById,
} from "../controllers/sell.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", findAll);
router.get("/byDate/", findByDate);
router.post("/", create);
router.patch("/", updateById);

export default router;
