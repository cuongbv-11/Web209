import { Router } from "express";
import routerAuth from "./auth.js";
import routerCategory from "./category.js";
import routerUser from "./user.js";
import cartRouter from "./cart.js";
// import { checkAuth } from "../middlewares/checkAuth.js";
import productRouter from "./productRouter.js";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", routerAuth);
router.use("/categories", routerCategory);
router.use("/users", routerUser);
router.use("/cart", cartRouter);

export default router;
