const mongoose = require('mongoose');

const billsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    billItems: {
        type: Array,
        required: true
    },
    TotalBill: {
        type: Number,
        required: true
    },
    paymentMode:{
        type: String,
        required: true
    },
}, { timestamps: true });

const Bills = mongoose.model('billingAppBills', billsSchema);
module.exports = Bills
