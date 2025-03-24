import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from './modules/auth/user.routes.js';
import { config } from './config/app.config.js';
import userRoutes from './modules/user/user.routes.js';
import taskRoutes from './modules/task/task.routes.js';
import taskDelayRoutes from './modules/task-delay/taskDelay.routes.js';
import groupMemberRoutes from './modules/group-member/groupMember.routes.js';
import groupRoutes from './modules/group/group.routes.js';
import rolRoutes from './modules/roles/rol.routes.js';
import typeTaskRoutes from './modules/type-task/typeTask.routes.js';
import categoryDelayRoutes from './modules/category-delay/categoryDelay.routes.js';

const app = express()
const BASE_PATH = config.BASE_PATH;

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_PATH}/auth`, authRouter);
app.use(`${BASE_PATH}/users`, userRoutes);
app.use(`${BASE_PATH}/group-members`, groupMemberRoutes);
app.use(`${BASE_PATH}/group`, groupRoutes);
app.use(`${BASE_PATH}/task`, taskRoutes);
app.use(`${BASE_PATH}/task-delay`, taskDelayRoutes);
app.use(`${BASE_PATH}/type-task`, typeTaskRoutes);
app.use(`${BASE_PATH}/category-delay`, categoryDelayRoutes);
app.use(`${BASE_PATH}/rol`, rolRoutes);

export default app