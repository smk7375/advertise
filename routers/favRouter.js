const express = require('express');
const { favad } = require('../controller/adcontroller');
const { protectRoute} = require('../controller/authcontroller');


const favRouter = express.Router();


favRouter.use(protectRoute);
favRouter.route('/:id')
.get(favad)

module.exports=favRouter;