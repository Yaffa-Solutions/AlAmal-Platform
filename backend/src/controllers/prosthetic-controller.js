import { createProsthetic } from "../services/prosthetic-service.js";

export const createProstheticHandler = async (req, res) => {
  try {
    const { name, details, org_id } = req.body;

    const newItem = await createProsthetic(name, details, org_id);
    res.status(201).json(newItem);
  } catch (err) {
    console.error("createProstheticHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
