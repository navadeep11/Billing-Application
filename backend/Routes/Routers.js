const express = require('express');
const Router=express.Router();
const {signup, signin,verifyOTP,getUser,logout, resendOTP} = require("../Controllers/Auth");
const {AddCategory,GetAllCategories, addItem, getAllItems, deleteItem} = require("../Controllers/Item");
const { addToCart,getCart, removeFromCart, increaseQuantity, decreaseQuantity } = require('../Controllers/Cart');
const { IsUser } = require('../Middlewares/Auth');
const { getBills, storeBill } = require('../Controllers/Bills');




// Authentication Routes

Router.post('/signup', signup);
Router.post("/verifyOTP", verifyOTP);
Router.post("/signin", signin);
Router.post("/resendOtp",resendOTP);
Router.post("/logout",IsUser, logout);
Router.get("/me", IsUser, getUser);


// Item Routers

Router.post("/addCategory", IsUser, AddCategory);
Router.get("/getAllCategories", IsUser, GetAllCategories);
Router.post("/addItem", IsUser, addItem);
Router.get("/getAllItems", IsUser, getAllItems);
Router.delete("/items/:id",IsUser, deleteItem);


// Cart Routers

Router.post("/addToCart", IsUser, addToCart);
Router.put("/increaseQuantity", IsUser, increaseQuantity);
Router.put("/decreaseQuantity", IsUser, decreaseQuantity);
Router.delete("/removeFromCart/:itemId", IsUser, removeFromCart);
Router.get("/getCart", IsUser, getCart);


// Bill Routers


Router.post("/storeBill", IsUser, storeBill);
Router.get("/getBills", IsUser, getBills)


module.exports = Router;