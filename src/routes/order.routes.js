import express from "express"
import { getOrder, postOrder } from "../controllers/order.controller.js";
const { Router } = express;
const routes = Router();
import { checkAuth } from "../middlewares/auth.middleware.js"

/* ---------  ------------- */
routes.get('/', checkAuth , getOrder )
routes.post('/', checkAuth , postOrder )

export default routes;