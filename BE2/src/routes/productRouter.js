import { Router } from "express";
import {
  createProduct,
  delProduct,
  getbyIDProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.get("/", getProduct);
productRouter.get("/:id", getbyIDProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", delProduct);
export default productRouter;
