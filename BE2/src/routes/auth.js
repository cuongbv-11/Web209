import { Router } from "express";
import { validBodyRequest } from "../middleware/validBodyRequest.js";
import { loginSchema, registerSchema } from "../validSchema/auth.js";
import { getProfile, login, register } from "../controllers/auth.js";
import { checkAuth } from "../middleware/checkAuth.js";

const routerAuth = Router();
routerAuth.post("/register", validBodyRequest(registerSchema), register);
routerAuth.post("/login", validBodyRequest(loginSchema), login);
// routerAuth.post("/forgot-password", forgotPassword);
routerAuth.get("/me", checkAuth, getProfile);
// routerAuth.patch("/me", checkAuth, updateProfile);

export default routerAuth;
