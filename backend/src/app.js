import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import organizationRoutes from "./routes/organization-routes.js";
import requestRoutes from "./routes/request-routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));

app.use("/api/organizations", organizationRoutes);
app.use("/api/requests", requestRoutes);
export default app;
