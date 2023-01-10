import express from "express"
const { Router } = express;
const routes = Router();
/* --------- gzip ------------- */
import compression from 'compression'
import { getUserInfo } from "../controllers/users.controller.js";
/* ---------  ------------- */
routes.get('/', compression() , getUserInfo )

export default routes