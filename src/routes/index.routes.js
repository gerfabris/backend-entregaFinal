import express from "express"
const { Router } = express;
const routes = Router();
/* --- require routes --- */
import home from './home.routes.js'
import admin from './admin.routes.js'
import chat from './chat.routes.js'
import cart from './cart.routes.js'
import user from './user.routes.js'
import info from './info.routes.js'
import login from './login.routes.js'
import faillogin from './faillogin.routes.js'
import signup from './signup.routes.js'
import failSignup from './failsignup.routes.js'
import logout from './logout.routes.js'
import order from './order.routes.js'
import failorder from './failorder.routes.js'
/* --- config --- */
routes.use('/', login)
routes.use('/productos', home)
routes.use('/admin', admin)
routes.use('/chat', chat)
routes.use('/cart', cart)
routes.use('/user', user)
routes.use('/info', info)
routes.use('/faillogin', faillogin)
routes.use('/signup', signup)
routes.use('/failsignup', failSignup)
routes.use('/logout', logout)
routes.use('/order', order)
routes.use('/failorder', failorder)

export default routes