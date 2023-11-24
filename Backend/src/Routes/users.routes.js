import { Router } from "express";
import { authorization, passportError } from "../utils/messagesError.js";
import {
  getAll,
  getById,
  putById,
  deleteByid,
} from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.get("/", passportError("jwt"), getAll);
userRouter.get("/:uid", authorization("Admin"), passportError("jwt"), getById);
userRouter.put("/:uid", authorization("Admin"), passportError("jwt"), putById);
userRouter.delete(
  "/:uid",
  authorization("Admin"),
  authorization("Admin"),
  deleteByid
);

export default userRouter;
