import { Router } from "express";
import { createProstheticHandler } from "../controllers/prosthetic-controller.js";

const router = Router();

router.post("/create", createProstheticHandler);

export default router;
