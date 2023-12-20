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

cartRouter.get("/", getCarts);
cartRouter.get("/:cid", getCart);
cartRouter.post("/:cid/product/:pid/", postCart);
cartRouter.put("/:cid/product/:pid", putCart);
cartRouter.delete("/:cid/", deleteCart);
cartRouter.get("/:cid/purchase", postCompra);

export default cartRouter;
