import {
  createProsthetic,
  deleteProsthetic,
  updateProsthetic,
} from "../services/prosthetic-service.js";

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

export const deleteProstheticHandler = async (req, res) => {
  try {
    const { name, details, count } = req.body;
    const deleted = await deleteProsthetic(name, details, count);
    res.json({ message: "Deleted successfully", deleted });
  } catch (err) {
    console.error("deleteProstheticHandler error:", err);
    res.status(500).json({ message: "Failed to delete" });
  }
};

export const updateProstheticHandler = async (req, res) => {
  try {
    const { oldName, details, newName } = req.body;
    const updated = await updateProsthetic(oldName, details, newName);
    res.json({ message: "Updated successfully", updated });
  } catch (err) {
    console.error("updateProstheticHandler error:", err);
    res.status(500).json({ message: "Failed to update" });
  }
};
