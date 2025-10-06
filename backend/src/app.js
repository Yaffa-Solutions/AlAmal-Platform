import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import organizationRoutes from "./routes/organization-routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/organizations", organizationRoutes);

export default app;
