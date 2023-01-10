import express from "express"
const { Router } = express;
import { checkAuth } from "../middlewares/auth.middleware.js"
import { getHome, getProductById, getProductsByCategory, postHome } from "../controllers/home.controller.js"

const routes = Router();

routes.get('/', checkAuth , getHome);
routes.get('/:id', checkAuth , getHome);
routes.post('/', checkAuth , postHome )
routes.get('/detail/:id', checkAuth , getProductById );
routes.get('/view/:category', checkAuth , getProductsByCategory);

export default routes;