const Bill = require("../Models/BillModel");
const User = require("../Models/AuthModel");
const Cart = require("../Models/CartModel");

// ================== Store Bill with Cash ==================
exports.storeBill = async (req, res) => {
    try {
        const { billItems, TotalBill, paymentMode } = req.body;
        const user = await User.findById(req.user.id);

        const bill = new Bill({
            userId: user._id,
            billItems,
            TotalBill,
            paymentMode,
        });

        await bill.save();

         // Clear the user's cart items and reset totalPrice to 0
        await Cart.findOneAndUpdate(
            { userId: user._id },
            { $set: { items: [], totalPrice: 0 } }
        );

        res.json({ data: "Cash bill generated successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ data: "Server error" });
    }
};



// ================== Get User's Bills ==================
exports.getBills = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const allBills = await Bill.find({ userId: user._id }).sort({ _id: -1 });
        res.json(allBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: "Server error" });
    }
};
