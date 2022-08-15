const express = require('express');
const { protectRoute} = require('../controller/authcontroller');



const {createad} = require('../controller/adcontroller');

const adRouter = express.Router();


adRouter.use(protectRoute);
adRouter.route('/crudPlan/:id')
.post(createad)

module.exports=adRouter;