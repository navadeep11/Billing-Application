const express = require('express');
const Router=express.Router();
const {signup, signin,verifyOTP,getUser,logout} = require("../Controllers/Auth");
const { IsUser } = require('../Middlewares/Auth');


// Authentication Routes

Router.post('/signup', signup);
Router.post("/verifyOTP", verifyOTP);
Router.post("/signin", signin);
Router.post("/logout", logout);
Router.get("/me",IsUser,getUser);
module.exports = Router;