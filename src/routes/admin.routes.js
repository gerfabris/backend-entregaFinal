import express from "express"
const { Router } = express;
import { checkAuth } from "../middlewares/auth.middleware.js"
import { deleteProduct, getAdmin, postAdmin, updateProduct } from "../controllers/admin.controller.js"

const routes = Router();

routes.get('/', checkAuth , getAdmin);
routes.post('/', checkAuth , postAdmin )
routes.post('/update', checkAuth , updateProduct )
routes.post('/delete', checkAuth , deleteProduct )

export default routes;