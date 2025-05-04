const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type:Number, required: true ,min:0},
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
},
{ timestamps: true }
);


const Item = mongoose.model('billingAppItems', ItemSchema);
module.exports = Item;