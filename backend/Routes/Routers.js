const express = require('express');
const Router=express.Router();
const {signup, signin,verifyOTP} = require("../Controllers/Auth");


// Authentication Routes

Router.post('/signup', signup);
Router.post("/verifyOTP", verifyOTP);
Router.post("/signin", signin);
module.exports = Router;