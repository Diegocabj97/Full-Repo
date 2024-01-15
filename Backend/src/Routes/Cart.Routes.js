import { Router } from "express";
import {
  getCart,
  postCart,
  putCart,
  deleteCart,
  getCarts,
} from "../controllers/cart.controllers.js";
import { postCompra } from "../controllers/ticket.controllers.js";
import { authorization, passportError } from "../utils/messagesError.js";

const cartRouter = Router();

//Authorization: Limita quien puede acceder a cada ruta mediante passport

cartRouter.get("/", authorization("user"), passportError("jwt"), getCarts);
cartRouter.get("/:cid", authorization("user"), passportError("jwt"), getCart);
cartRouter.post(
  "/:cid/product/:pid/",
  authorization("user"),
  passportError("jwt"),
  postCart
);
cartRouter.put(
  "/:cid/product/:pid",
  authorization("user"),
  passportError("jwt"),
  putCart
);
cartRouter.delete(
  "/:cid/",
  authorization("user"),
  passportError("jwt"),
  deleteCart
);
cartRouter.get(
  "/:cid/purchase",
  authorization("user"),
  passportError("jwt"),
  postCompra
);

export default cartRouter;
