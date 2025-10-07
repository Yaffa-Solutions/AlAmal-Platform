import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import otpRoutes from './routes/otpRoutes.js';
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
import organizationRoutes from "./routes/organization-routes.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.use(cors({ origin: "http://localhost:3000" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/organizations", organizationRoutes);

app.use('/api/otp',otpRoutes);

export default app;
