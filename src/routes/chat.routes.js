import express from "express"
const { Router } = express;
import { checkAuth } from "../middlewares/auth.middleware.js"
import { getByEmail, getChat, postChat } from "../controllers/chat.controllers.js";

const routes = Router();

routes.get('/', checkAuth , getChat);
routes.post('/', checkAuth , postChat )
routes.get('/:email', checkAuth , getByEmail )

export default routes;