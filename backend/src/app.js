import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import otpRoutes from './routes/otpRoutes.js';
import roleRouter from './routes/roleRouter.js';
import donorRoutes from './routes/donorRoutes.js';
<<<<<<< HEAD
=======
import authRoutes from './routes/authRoutes.js';
>>>>>>> f195d7a (add full donor dashboard with campaigns, donations history, logout, and modals)
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
import organizationRoutes from "./routes/organization-routes.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/organizations", organizationRoutes);

app.use('/api/otp',otpRoutes);

app.use('/api/roles', roleRouter);

app.use('/api/donor', donorRoutes);

<<<<<<< HEAD
=======
app.use('/api/logout', authRoutes);

>>>>>>> f195d7a (add full donor dashboard with campaigns, donations history, logout, and modals)

export default app;
