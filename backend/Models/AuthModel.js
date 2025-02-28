const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
});


const User = mongoose.model('billingAppUsers', AuthSchema);
module.exports = User