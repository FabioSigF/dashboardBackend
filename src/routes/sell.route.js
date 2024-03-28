import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  updateById,
  findByIdCompany,
  deleteById,
  findByDate
} from "../controllers/sell.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", findAll);
router.get("/bydate", findByDate);
router.get("/:id", findByIdCompany);
router.post("/", create);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);

export default router;
