import express from "express"
const { Router } = express;
import passport from '../services/passport.js'
import { getFailSignup, postFailSignup } from"../controllers/signup.controller.js"
import { upload } from "../middlewares/upsload.middlware.js";

const router = Router();

/* ------ FAIL SIGNUP --------  */
router.get('/', getFailSignup);
router.post('/', upload.single('avatar'), passport.authenticate('signup', {failureRedirect:'/failsignup'}) , postFailSignup );

export default router;

