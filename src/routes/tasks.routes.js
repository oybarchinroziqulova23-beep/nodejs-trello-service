import express from "express";
import { validate } from "../middleware/validation.js";
import { taskValidation } from "../validation/tasks.validation.js";
import { paginate } from "../middleware/pagination.js";
import taskController from "../controllers/tasks.controller.js";

const router = express.Router();

router.post("/", validate(taskValidation), (req, res) => taskController.create(req, res));
router.get("/", paginate, (req, res) => taskController.getAll(req, res));
router.get("/search",paginate, (req, res) => taskController.search(req, res));
router.get("/:id", (req, res) => taskController.getById(req, res));
router.put("/:id", validate(taskValidation), (req, res) => taskController.update(req, res));
router.delete("/:id", (req, res) => taskController.remove(req, res));

export default router;