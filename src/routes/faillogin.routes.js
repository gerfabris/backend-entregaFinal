import express from "express"
import passport from '../services/passport.js'
import { getFailLogin, postFailLogin } from "../controllers/login.controller.js"
const { Router } = express;
const routes = Router();
/* -------------- FAIL LOGIN ------------- */
routes.get('/', getFailLogin);
routes.post('/', passport.authenticate('login', {failureRedirect:'/faillogin'}) , postFailLogin  )

export default routes