import { Router } from "express";
import productRouter from "./productRouter.js";
import categoryRoutes from "./category.js";
import routerUser from "./userRouter.js";
import routerAuth from "./auth.js";

const router = Router();

router.use("/products", productRouter);
router.use("/user", routerUser);
router.use("/categories", categoryRoutes);
router.use("/auth", routerAuth);

export default router;
