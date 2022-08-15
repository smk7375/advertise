const express = require('express');

const admodel = require('../models/admodel');

const usermodel = require('../models/usermodel');

module.exports.createad = async function createad(req, res) {
    let id = req.params.id;
    let user = await usermodel.findById(id);
    try {
        let ad = await admodel.create(req.body);
        if (ad) {
            res.json({
                message: "ad created succesfully",
                data: ad
            });
        } else {
            res.json({
                message: 'error while creating',
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message,
        });
    }

}

module.exports.favad = async function favad(req,res){
    let ad_id = req.params.id;
    let ad = await admodel.findById(ad_id);
    let user_id = ad.userid;
    let user = await usermodel.findById(user_id);
    user.favourite.push(ad_id);
    await user.save();
    return res.json({
        message:'made favourite successfully',
        data:user
    });
}