import express from "express"
const { Router } = express;
import passport from '../services/passport.js'
import { getSignup, postSignup } from "../controllers/signup.controller.js"
import { upload } from "../middlewares/upsload.middlware.js";
const routes = Router();
/* ------------- SIGNUP ------------- */
routes.get('/', getSignup);
routes.post('/', upload.single('avatar'), passport.authenticate('signup', {failureRedirect:'/failsignup'}) , postSignup);

export default routes;

