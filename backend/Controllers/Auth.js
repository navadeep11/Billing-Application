require('dotenv').config();
const sendMail=require('../Config/EmailTransporter');
const jwt=require("jsonwebtoken");
const User=require("../Models/AuthModel");
const argon2=require("argon2");
const {sendOTP,verifyOTP}=require("../Config/OTPGenerator");




// Secert key for JWT

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;




// Sign UP
exports.signup = async (req, res) => {
    let { name, email, password } = req.body;
    
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      const otp = await sendOTP(email);
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


// OTP verification

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });
     
        // Check if OTP is valid and not expired
        if (!verifyOTP(email,otp)) {   
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark the user as verified
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

//Resend OTP

exports.resendOTP = async (req, res) => {

    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });
        const otp = await sendOTP(email);
        const subject = "Verify your Email";
        const message = `Your email verification code is ${otp}`;
        // Send OTP to email
        sendMail(user.email, subject, message);
        res.status(200).json({ message: 'New OTP sent to your email.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
}

// Sign In 
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    // Check if the user exists and is verified
    if (!user) {
      return res.status(400).json({ error: "User does not exist." });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "User not verified. Please verify your email." });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });


    // Set HTTP-Only Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,  
      sameSite:'Lax',
      maxAge: 2 * 60 * 60 * 1000
    });

    // Send response with the user data and token
    res.status(200).json({ 
      message: "Sign in successful", 
 
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error." });
  }
};


// User details
exports.getUser = async (req, res) => {
  try {
    // Extract user ID from request (added by authMiddleware)
    const user = await User.findById(req.user.id).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ 
      id: user._id,
      name: user.name,
      email: user.email
    });
    

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error." });
  }
};


// Logout
exports.logout=async (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
  res.status(200).json({ message: "Logout successful" });
};
