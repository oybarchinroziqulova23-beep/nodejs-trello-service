import express from "express";
import { validate } from "../middleware/validation.js";
import { boardValidation } from "../validation/board.validation.js";
import boardController from "../controllers/board.controller.js";

const router = express.Router();

router.post("/", validate(boardValidation), (req, res) => boardController.create(req, res));
router.get("/", (req, res) => boardController.getAll(req, res));
router.get("/search", (req, res) => boardController.search(req, res));
router.get("/:id", (req, res) => boardController.getById(req, res));
router.put("/:id", validate(boardValidation), (req, res) => boardController.update(req, res));
router.delete("/:id", (req, res) => boardController.remove(req, res));

export default router;