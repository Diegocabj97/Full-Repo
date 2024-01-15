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

userRouter.get("/", authorization("user"), getAll);
userRouter.get("/:uid", authorization("user"), getById);
userRouter.put("/:uid", authorization("user"), putById);
userRouter.delete("/:uid", authorization("user"), deleteByid);
userRouter.post("/password-recovery", authorization("user"), pwRecovery);
userRouter.post("/reset-password/:token", authorization("user"), pwReset);

userRouter.post("/docsUpload", Docs.single("img"), documentsUpload);
userRouter.post("/profPicsUpload", ProfPics.single("img"), profilePicsUpload);
userRouter.post("/prodPicsUpload", prodPics.single("img"), prodPicsUpload);

export default userRouter;
