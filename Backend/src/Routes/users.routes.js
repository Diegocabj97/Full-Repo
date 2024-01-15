import { Router } from "express";
import { authorization, passportError } from "../utils/messagesError.js";
import {
  getAll,
  getById,
  putById,
  deleteByid,
  pwRecovery,
  pwReset,
} from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.get("/", authorization("admin"), getAll);
userRouter.get("/:uid", authorization("user"), getById);
userRouter.put("/:uid", authorization("user"), putById);
userRouter.delete("/:uid", authorization("user"), deleteByid);
userRouter.post("/password-recovery", authorization("user"), pwRecovery);
userRouter.post("/reset-password/:token", authorization("user"), pwReset);

export default userRouter;
