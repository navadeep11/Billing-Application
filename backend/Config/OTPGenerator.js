const { authenticator } = require('otplib');


authenticator.options = {
    step: 300, // OTP expires in 300 seconds (5 minutes)
    digits: 4, // 6-digit OTP
    algorithm: "sha256", // Secure hashing algorithm
};

// Set up a secret key (store this securely)
const secret = authenticator.generateSecret();


// Generate a Time-Based OTP (TOTP)
const sendOTP=()=>{
    const otp = authenticator.generate(secret);
    return otp;
}



// Verify the OTP
const verifyOTP=(otp)=>{
    const isValid = authenticator.check(otp, secret);
    return isValid;
}

module.exports = { sendOTP, verifyOTP };