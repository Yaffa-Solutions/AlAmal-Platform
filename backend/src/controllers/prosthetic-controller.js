import {
  createProsthetic,
  deleteProsthetic,
  updateProsthetic,
  getGrantedProstheticsByOrg,
  getRecentInventoryByOrg,
} from "../services/prosthetic-service.js";

export const createProstheticHandler = async (req, res) => {
  try {
    const { name, details, org_id, quantity } = req.body;
    const newItem = await createProsthetic(name, details, org_id, quantity);
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
    const { oldName, details, newName, newDetails, quantity } = req.body;
    const updated = await updateProsthetic(
      oldName,
      details,
      newName,
      newDetails,
      quantity
    );
    res.json({ message: "Updated successfully", updated });
  } catch (err) {
    console.error("updateProstheticHandler error:", err);
    res.status(500).json({ message: "Failed to update" });
  }
};

export const getGrantedProstheticsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const prosthetics = await getGrantedProstheticsByOrg(id);
    res.status(200).json(prosthetics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch granted prosthetics" });
  }
};

export const getRecentInventoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await getRecentInventoryByOrg(id);
    res.json(items);
  } catch (err) {
    console.error("getRecentInventoryHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
