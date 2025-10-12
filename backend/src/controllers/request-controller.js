import {
  getRecentRequestsByOrg,
  getRecentRequestsAll,
  updateRequestStatus,
} from "../services/request-service.js";

export const getRecentRequestsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;
    const items = await getRecentRequestsByOrg(id, limit ?? 5);
    res.json(items);
  } catch (err) {
    console.error("getRecentRequestsHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecentRequestsAllHandler = async (req, res) => {
  try {
    const { limit, search } = req.query;
    const items = await getRecentRequestsAll(limit ?? 5, search);
    res.json(items);
  } catch (err) {
    console.error("getRecentRequestsAllHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRequestStatusHandler = async (req, res) => {
  try {
    console.log(req.params, req.body);

    const { id } = req.params;
    const { status, organization_id } = req.body;

    const updated = await updateRequestStatus(id, organization_id, status);

    res.json(updated);
  } catch (err) {
    console.error("updateRequestStatusHandler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
