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
import { sendRecoveryMail } from "../main.js";

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
userRouter.post("/password-recovery", pwRecovery);

userRouter.post("/reset-password/:token", pwReset);

export default userRouter;
