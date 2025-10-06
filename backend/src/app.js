import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import route from "./routes/index.js";
import { errorHandler } from "./middlewares/error.js";

import organizationRoutes from "./routes/organization-routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/organizations", organizationRoutes);

app.use(route);
app.use(errorHandler);
export default app;