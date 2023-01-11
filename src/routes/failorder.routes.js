import express from "express"
import { getFailOrder } from "../controllers/order.controller.js";
const { Router } = express;
const routes = Router();
import { checkAuth } from "../middlewares/auth.middleware.js"

/* ---------  ------------- */
routes.get('/', checkAuth , getFailOrder )

export default routes;