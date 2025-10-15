import express from "express";
import userRoutes from "./user.routes.js";
import taskRoutes from "./tasks.routes.js";
import boardRoutes from "./board.routes.js";
import  authenticate  from "./auth.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/boards", boardRoutes);
router.use("/auth", authenticate);

export default router;
