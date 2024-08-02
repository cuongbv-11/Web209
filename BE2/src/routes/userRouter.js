import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { checkIsAdmin } from "../middleware/checkAdmin.js";
import { getUserById, getUsers } from "../controllers/user.js";

const routerUser = Router();

routerUser.use(checkAuth, checkIsAdmin);
routerUser.get("/", getUsers);
routerUser.get("/:id", getUserById);

export default routerUser;
