import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

import organizationRoutes from "./routes/organization.routes.js";

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/organizations", organizationRoutes);

export default app;
