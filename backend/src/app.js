import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import otpRoutes from './routes/otpRoutes.js';
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.get("/", (_req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

app.use('/api/otp',otpRoutes);

export default app;
