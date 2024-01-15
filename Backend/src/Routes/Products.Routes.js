import { Router } from "express";
import {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
  postProductWImage,
} from "../controllers/products.controllers.js";
import { authorization, passportError } from "../utils/messagesError.js";

const prodsRouter = Router();

prodsRouter.get("/", getProducts);
prodsRouter.get("/:id", getProduct);
prodsRouter.post("/", authorization("admin"), postProduct);
prodsRouter.post("/PwI", authorization("admin"), postProductWImage);
prodsRouter.put("/:id", authorization("admin"), putProduct);
prodsRouter.delete("/:id", authorization("admin"), deleteProduct);

export default prodsRouter;
