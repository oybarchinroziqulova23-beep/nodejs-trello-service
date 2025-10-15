import express from "express";
import taskController from "../../controllers/tasks.controller.js";
import { authenticateToken } from "../../middleware/auth.js";
import { validate } from "../../middleware/validation.js";
import { taskValidation } from "../../validation/tasks.validation.js";

const router = express.Router();

router.post("/", authenticateToken, validate(taskValidation), taskController.create);
router.get("/", authenticateToken, taskController.getAll);
router.get("/:id", authenticateToken, taskController.getById);
router.put("/:id", authenticateToken, validate(taskValidation), taskController.update);
router.delete("/:id", authenticateToken, taskController.remove);

export default router;
