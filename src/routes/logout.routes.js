import express from "express"
const { Router } = express;
import {getLogout} from "../controllers/logout.controller.js"
const router = Router();
/* ------------- LOGOUT ------------- */
router.get('/', getLogout)

export default router;