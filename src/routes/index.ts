import express, { Router } from 'express';
import userRouter from './userRoutes';
import loginRouter from './loginRoutes';
import teamsRouter from './teamsRoutes';

const router: Router = express.Router();

router.use('', loginRouter);
router.use('/users', userRouter);
router.use('teams', teamsRouter);

export default router;