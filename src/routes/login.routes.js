import express from "express"
import passport from '../services/passport.js'
import { getLogin, postLogin } from "../controllers/login.controller.js"
/* -------- ------------ */
const { Router } = express;
const routes = Router();
/* -------------- LOGIN ------------- */
routes.get('/', getLogin );
routes.post('/', passport.authenticate('login', {failureRedirect:'/faillogin'}) , postLogin );

export default routes;
