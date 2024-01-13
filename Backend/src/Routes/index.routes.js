import { Router } from "express";
import userRouter from "./users.routes.js";
import cartRouter from "./Cart.Routes.js";
import prodsRouter from "./Products.Routes.js";
import SessionRouter from "./session.routes.js";
import msgRouter from "./messages.routes.js";
import mockRouter from "./mocking.routes.js";
import { authorization } from "../utils/messagesError.js";

const router = Router();

router.use("/api/users", userRouter);
router.use("/api/sessions", SessionRouter);
router.use("/api/products", prodsRouter);
router.use("/api/cart", cartRouter);
router.use("/api/messages", authorization("admin"), msgRouter);
router.use("/api/mocking", authorization("admin"), mockRouter);

export default router;
