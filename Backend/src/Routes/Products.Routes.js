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

prodsRouter.get("/", authorization("user"), getProducts);
prodsRouter.get("/:id", authorization("user"), getProduct);
prodsRouter.post("/", authorization("admin"), postProduct);
prodsRouter.post("/PwI", authorization("admin"), postProductWImage);
prodsRouter.put("/:pid", authorization("admin"), putProduct);
prodsRouter.delete("/:pid", authorization("admin"), deleteProduct);

export default prodsRouter;
