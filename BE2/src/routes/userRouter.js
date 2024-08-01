import { Router } from "express";

import { signin, signup } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/register", signup);
userRouter.post("/login", signin);

export default userRouter;
