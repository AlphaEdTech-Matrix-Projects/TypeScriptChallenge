import express, { Router } from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
import teamsRouter from "./teamsRoutes";

const router: Router = express.Router();

router.use("", authRouter);
router.use("/users", userRouter);
router.use("teams", teamsRouter);

export default router;
