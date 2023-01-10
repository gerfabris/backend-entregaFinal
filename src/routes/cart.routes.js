import { addToCart, deleteProductFromCart, getCart , postCart } from "../controllers/cart.controller.js";
import express from "express"
const { Router } = express;
const routes = Router();
import { checkAuth } from "../middlewares/auth.middleware.js"

/* ---------  ------------- */
routes.get('/', checkAuth , getCart )
routes.get('/:idProducto', checkAuth , deleteProductFromCart )
//routes.post('/', checkAuth , postCart )
routes.post('/' , checkAuth , addToCart )

export default routes;