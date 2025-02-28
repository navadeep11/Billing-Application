require('dotenv').config();
const sendMail=require('../Config/EmailTransporter');
const jwt=require("jsonwebtoken");
const User=require("../Models/AuthModel");
const argon2=require("argon2");
const { authenticator } = require('otplib');


// Secert key for JWT

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;


// OTP Generator

// Set up a secret key (store this securely)
const secret = authenticator.generateSecret();
console.log("Secret Key:", secret); // Save this securely

// Generate a Time-Based OTP (TOTP)
const otp = authenticator.generate(secret);
console.log("Generated OTP:", otp);

// Verify the OTP
const isValid = authenticator.check(otp, secret);
console.log("Is OTP Valid?", isValid);




exports.signup = async (req, res) => {
    let { name, email, password } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      const subject = "Verify your Email";
      const message = `Your email verification code is ${otp}`;
  
      if (user) {
        if (!user.isVerified) {
          try {
         
            sendMail(user.email, subject, message);
  
            return res.status(200).json({
              message: "User not verified. New OTP sent to email.",
            });
          } catch (error) {
            return res.status(500).json({
              message: "Error resending OTP.",
              error: error.message,
            });
          }
        }
  
        return res
          .status(400)
          .json({ message: "User already exists. Please sign in." });
      }
  
      // Hash password
      
      password = await argon2.hash(password);
  
      // Create a new user entry
      user = new User({
        name,
        email,
        password,
      });
  
      await user.save();
  
      // Send OTP to email
      sendMail(user.email, subject, message);
  
      return res.status(200).json({ message: "User created. OTP sent to email for verification." });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  };