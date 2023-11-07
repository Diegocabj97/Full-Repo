import { Router } from "express";
import { userModel } from "../models/users.models.js";
import { authorization } from "../utils/messagesError.js";
import {
  getAll,
  getById,
  putById,
  deleteByid,
} from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.get("/", getAll);
userRouter.get("/:uid", passportError("jwt"), getById);
userRouter.put("/:uid", passportError("jwt"), putById);
userRouter.delete("/:uid", authorization("admin"), deleteByid);

export default userRouter;
