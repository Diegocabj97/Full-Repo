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
prodsRouter.post("/", postProduct);
prodsRouter.post("/PwI", postProductWImage);
prodsRouter.put("/:id", putProduct);
prodsRouter.delete("/:id", deleteProduct);

export default prodsRouter;
