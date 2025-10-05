import express from "express";
import cors from "cors";
import route from "./routes/index.js";
import { errorHandler } from "./middlewares/error.js";


const app = express();

app.use(cors());
app.use(express.json());


app.use(route);
app.use(errorHandler);
export default app;