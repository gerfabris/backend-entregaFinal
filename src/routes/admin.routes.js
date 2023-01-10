import express from "express"
const { Router } = express;
import { checkAuth } from "../middlewares/auth.middleware.js"
import { getAdmin, postAdmin } from "../controllers/admin.controller.js"

const routes = Router();

routes.get('/', checkAuth , getAdmin);
routes.post('/', checkAuth , postAdmin )

export default routes;