const express = require('express');
const Router=express.Router();
const {signup} = require("../Controllers/Auth");

// Authentication Routes

Router.post('/signup', signup);

module.exports = Router;