import express from "express";
import cors from "cors";
import otpRoutes from './routes/otpRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

app.use('/api/otp',otpRoutes);

export default app;
