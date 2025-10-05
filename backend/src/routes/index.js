import express from "express";
import router from "./PatientRoutes.js";

const route = express.Router();

route.use(router);

export default route;