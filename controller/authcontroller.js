const express = require('express');

const usermodel = require('../models/usermodel');
const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../secret');


// sign up
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await usermodel.create(dataObj);
        if (user) {
            res.json({
                message: "user signed up succesfully",
                data: user
            });
        } else {
            res.json({
                message: 'error while sign up',
            });
        }
    }
    catch (err) {
        res.json({ 
            message: err.message,
        });
    }
}

// login
module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.phoneNumber) {
            let user = await usermodel.findOne({ phoneNumber: data.phoneNumber });
            if (user) {
                
                if (user.password == data.password) {
                    let phoneNumber = user['phoneNumber'];
                    let token = jwt.sign({ payload: phoneNumber}, JWT_KEY);
                    res.cookie('Loggedin', token, { httpOnly: true });
                    return res.json({
                        message: 'user login succesfully',
                        userDetails: user
                    })
                } else {
                    return res.json({
                        message: 'wrong credentials'
                    })
                }
            }
            else {
                return res.json({
                    message: "user not fouond"
                })
            }
        }
        else {
            return res.json({
                message: 'please enter the Phone Number'
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}


module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.Loggedin) {
            token = req.cookies.Loggedin;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                
                next();
            } else {
                //browser
                const client = req.get(User-Agent);
                if(client.includes("Mozilla") == true){
                    return res.redirect('/login');
                }
                return res.json({
                    message: 'user not verified'
                })
            }
        } else {
            return res.json({
                message: 'please log in'
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message,
        });
    }
}