const express = require('express');
const app = express();

const userRouter = express.Router();

const {login , signup , protectRoute} = require('../controller/authcontroller');


//sign up
userRouter.route('/signup')
.post(signup)

//login
userRouter.route('/login')
.post(login)



module.exports=userRouter;
