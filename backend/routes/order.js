const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/prod");

/****************** Add New Order******************/

router.post("/order", async (req, res) => {
  try {
    const {
      user,
      products,
      totalAmount,
      status,
      shippingAddress,
      phone,
      email,
      name,
      lastname,
    } = req.body;

    const orderUser = user ? user : null;

    const newOrder = new Order({
      user: orderUser,
      products,
      totalAmount,
      status,
      shippingAddress,
      phone,
      email,
      name,
      lastname,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder.orderId);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add the order." });
  }
});

/****************** Get totalPrice for Order******************/

router.post("/totalPrice", async (req, res) => {
  try {
    const items = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid request data." });
    }

    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    let total = 0;
    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }

    res.json({ totalPrice: total });
  } catch (err) {
    console.error("Error calculating total price:", err);
    res.status(500).json({ error: "Failed to calculate total price." });
  }
});
module.exports = router;
