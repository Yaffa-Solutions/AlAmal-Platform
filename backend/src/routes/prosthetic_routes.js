import { Router } from "express";
import {
  createProstheticHandler,
  deleteProstheticHandler,
  updateProstheticHandler,
} from "../controllers/prosthetic-controller.js";

const router = Router();

router.post("/create", createProstheticHandler);
router.post("/delete", deleteProstheticHandler);
router.post("/update", updateProstheticHandler);

export default router;
