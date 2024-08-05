import { Router } from "express";
import routerAuth from "./auth.js";
import routerCategory from "./category.js";
import routerUser from "./user.js";
import cartRouter from "./cart.js";
// import { checkAuth } from "../middlewares/checkAuth.js";
import productRouter from "./productRouter.js";
<<<<<<< HEAD
=======
import categoryRoutes from "./category.js";
import routerUser from "./userRouter.js";
import routerAuth from "./auth.js";
>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067

const router = Router();

router.use("/products", productRouter);
<<<<<<< HEAD
router.use("/auth", routerAuth);
router.use("/categories", routerCategory);
router.use("/users", routerUser);
router.use("/cart", cartRouter);
=======
router.use("/user", routerUser);
router.use("/categories", categoryRoutes);
router.use("/auth", routerAuth);
>>>>>>> 44a5c579e20b6d09b6ff4e7a132fc98672315067

export default router;
