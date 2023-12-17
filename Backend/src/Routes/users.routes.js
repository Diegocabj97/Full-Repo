import { Router } from "express";
import { authorization, passportError } from "../utils/messagesError.js";
import {
  getAll,
  getById,
  putById,
  deleteByid,
} from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.get("/", getAll);
userRouter.get("/:uid", getById);
userRouter.put("/:uid", putById);
userRouter.delete(
  "/:uid",
  authorization("Admin"),
  authorization("Admin"),
  deleteByid
);

export default userRouter;
