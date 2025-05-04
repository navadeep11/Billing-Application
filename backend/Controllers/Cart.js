const Cart = require('../Models/CartModel');
const Item = require('../Models/ItemModel');

// Add to Cart
exports.addToCart = async (req, res) => {
  const { itemId } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(cartItem => cartItem.itemId.toString() === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        itemId: item._id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: 1,
      });
    }

    cart.totalPrice = cart.items.reduce((total, i) => total + i.price * i.quantity, 0);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err });
  }
};

// Increase Quantity
exports.increaseQuantity = async (req, res) => {
  const { itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(i => i.itemId.toString() === itemId);
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    item.quantity += 1;
    cart.totalPrice = cart.items.reduce((total, i) => total + i.price * i.quantity, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error increasing quantity', error: err });
  }
};

// Decrease Quantity
exports.decreaseQuantity = async (req, res) => {
  const { itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(i => i.itemId.toString() === itemId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

    const item = cart.items[itemIndex];

    item.quantity -= 1;

    // Remove item if quantity is zero or less
    if (item.quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    // Recalculate total
    cart.totalPrice = cart.items.reduce((total, i) => total + i.price * i.quantity, 0);
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error decreasing quantity', error: err });
  }
};


// Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(i => i.itemId.toString() !== itemId);
    cart.totalPrice = cart.items.reduce((total, i) => total + i.price * i.quantity, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from cart', error: err });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err });
  }
};
