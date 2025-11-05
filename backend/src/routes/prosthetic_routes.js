import { Router } from "express";
import {
  createProstheticHandler,
  deleteProstheticHandler,
  updateProstheticHandler,
  getGrantedProstheticsHandler,
  getRecentInventoryHandler,
} from "../controllers/prosthetic-controller.js";

const router = Router();

router.post("/create", createProstheticHandler);
router.post("/delete", deleteProstheticHandler);
router.post("/update", updateProstheticHandler);
router.get("/organization/:id/granted", getGrantedProstheticsHandler);
router.get("/:id/recent/inventory", getRecentInventoryHandler);

export default router;
