import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import otpRoutes from "./routes/otpRoutes.js";
import roleRouter from "./routes/roleRouter.js";
import donorRoutes from "./routes/donorRoutes.js";
import organizationRoutes from "./routes/organization-routes.js";
import { errorHandler } from "./middlewares/error.js";
import patientRoutes from "./routes/PatientRoutes.js";
import campaignRoutes from "./routes/campaign-routes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
import requestRoutes from "./routes/request-routes.js";
import prostheticRouter from "./routes/prosthetic_routes.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/organizations", organizationRoutes);

app.use("/api/otp", otpRoutes);

app.use("/api/roles", roleRouter);

app.use("/api/donor", donorRoutes);

app.use("/api/logout", authRoutes);

app.use("/api/patient", patientRoutes);

app.use("/api/requests", requestRoutes);
app.use("/api/prosthetics", prostheticRouter);
app.use("/api/campaigns", campaignRoutes);
app.use(errorHandler);
export default app;
