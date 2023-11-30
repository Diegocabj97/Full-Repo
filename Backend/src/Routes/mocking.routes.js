import { Router } from "express";
import { createRandomProducts } from "../controllers/mocking.controllers.js";

const mockRouter = Router();

mockRouter.get("/:num", (req, res) => {
  const { num } = req.params;
  createRandomProducts(parseInt(num), req, res);
});
export default mockRouter;
