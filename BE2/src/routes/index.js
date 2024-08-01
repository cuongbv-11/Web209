import { Router } from "express";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import categoryRoutes from "./category.js";

const router = Router();

router.use("/products", productRouter);
router.use("/user", userRouter);
router.use("/categories", categoryRoutes);

export default router;
