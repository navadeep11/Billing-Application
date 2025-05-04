const { toBeRequired } = require("@testing-library/jest-dom/matchers");
const redis = require("redis");
require("dotenv").config();

// 🔹 Connect to Redis
const client = redis.createClient({ url: process.env.REDIS_URL });

client.connect()
  .then(() => console.log("Connected to Redis"))
  .catch(err => console.error("Redis Connection Error:", err));

// Function to generate a 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

//  Send OTP and store in Redis
const sendOTP = async (email) => {
  try {
    const otp = generateOTP();

    // Store OTP in Redis with expiration (5 minutes)
    await client.setEx(`otp:${email}`, 300, otp);
    return  otp ;
  } catch (error) {
    console.log(error)
    return null;
  }
};

// Verify OTP
const verifyOTP = async (email, otp) => {
  try {
    const storedOtp = await client.get(`otp:${email}`);

    if (!storedOtp) return { success: false, message: "OTP expired or not found" };
    if (storedOtp !== otp) return { success: false, message: "Invalid OTP" };

    // OTP is valid; delete it after successful verification
    await client.del(`otp:${email}`);

    return true
  } catch (error) {
    
    return false
  }
};

module.exports = { sendOTP, verifyOTP };
