import { Router } from "express";
import { authorization, passportError } from "../utils/messagesError.js";
import {
  getAll,
  getById,
  putById,
  deleteByid,
  pwRecovery,
  pwReset,
  documentsUpload,
  profilePicsUpload,
  prodPicsUpload,
} from "../controllers/users.controllers.js";
import { Docs, ProfPics, prodPics } from "../utils/multer.js";

const userRouter = Router();

userRouter.get("/", getAll);
userRouter.get("/:uid", authorization("user"), passportError("jwt"), getById);
userRouter.put("/:uid", authorization("user"), passportError("jwt"), putById);
userRouter.delete(
  "/:uid",
  authorization("user"),
  passportError("jwt"),
  deleteByid
);
userRouter.post("/password-recovery", authorization("user"), pwRecovery);
userRouter.post("/reset-password/:token", authorization("user"), pwReset);

userRouter.post(
  "/docsUpload",
  authorization("user"),
  Docs.single("img"),
  documentsUpload
);
userRouter.post(
  "/:uid/profPicsUpload",
  authorization("user"),
  ProfPics.single("img"),
  profilePicsUpload
);
userRouter.post(
  "/prodPicsUpload",
  authorization("admin"),
  prodPics.single("img"),
  prodPicsUpload
);

export default userRouter;
