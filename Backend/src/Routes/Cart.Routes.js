import { Router } from "express";
import {
  getCart,
  postCompra,
  postCart,
  putCart,
  deleteCart,
} from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.get("/:cid", passportError("jwt"), authorization("user"), getCart);
cartRouter.post(
  "/:cid/products/:pid/",
  passportError("jwt"),
  authorization("user"),
  postCart
);
cartRouter.put(
  "/:cid/products/:pid",
  passportError("jwt"),
  authorization("user"),
  putCart
);
cartRouter.delete(
  "/:cid/products/:pid",
  passportError("jwt"),
  authorization("Admin"),
  deleteCart
);
cartRouter.postCompra(
  "/:cid/purchase",
  passportError("jwt"),
  authorization("user"),
  postCompra
);

export default cartRouter;
