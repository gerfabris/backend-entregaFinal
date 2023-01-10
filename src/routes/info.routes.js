import express from "express"
const { Router } = express;
import { getInfo } from "../controllers/info.controller.js"
const routes = Router();
/* ----- config routes ----- */
routes.get('/', getInfo)

export default routes;