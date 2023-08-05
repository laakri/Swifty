const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/prod");
const Coupon = require("../models/coupon");
const User = require("../models/user");
const mongoose = require("mongoose");

/****************** Add New Order******************/

router.post("/order", async (req, res) => {
  try {
    const {
      user,
      products,
      totalAmount,

      shippingAddress,
      phone,
      email,
      name,
      lastname,
      couponId,
    } = req.body;

    const orderUser = user ? user : null;

    const newOrder = new Order({
      user: orderUser,
      products,
      totalAmount,

      shippingAddress,
      phone,
      email,
      name,
      lastname,
      couponId,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder.orderId);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add the order." });
  }
});
/****************** Get Order By Order Code ******************/
router.get("/Get-order/:orderCode", async (req, res) => {
  const orderCode = req.params.orderCode;

  try {
    const order = await Order.findOne({ orderId: orderCode }).populate({
      path: "products.productId",
      select: "_id name price category images",
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.json(order);
  } catch (err) {
    console.error("Error retrieving order:", err);
    res.status(500).json({ error: "Failed to retrieve the order." });
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
/****************** Apply Coupon ******************/
router.post("/order/apply-coupon", async (req, res) => {
  try {
    const { items, couponCode, userId } = req.body;
    // Check if the user exists in general
    const userExists = await checkUserExist(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }
    // Check if the coupon has been used by the same user in the same order
    const isCouponUsed = coupon.usedByUsers.includes(userId);
    if (isCouponUsed) {
      return res
        .status(400)
        .json({ error: "Coupon already used by the same user." });
    }

    const currentDate = new Date();
    if (currentDate < coupon.validFrom || currentDate > coupon.validTo) {
      return res.status(400).json({ error: "Coupon is not valid." });
    }

    const totalPriceResponse = await calculateTotalPrice(items);
    if (!totalPriceResponse.success) {
      return res
        .status(totalPriceResponse.statusCode)
        .json(totalPriceResponse.error);
    }

    const totalAmount = totalPriceResponse.totalPrice;

    // Check if the coupon has reached its usage limit
    if (coupon.currentUsage >= coupon.maxUsage) {
      coupon.isActive = false;
    } else {
      coupon.currentUsage += 1;
    }

    // Mark the coupon as used by the current user
    coupon.usedByUsers.push(userId);

    await coupon.save();

    // Update the user's document with the applied coupon
    const user = await User.findByIdAndUpdate(
      userId,
      { appliedCoupon: coupon._id },
      { new: true }
    );

    const discountedAmount = totalAmount * (1 - coupon.discount / 100);

    res.json({
      totalAmount: discountedAmount,
      couponId: coupon._id,
      isActive: coupon.isActive,
    });
  } catch (err) {
    console.error("Error applying coupon:", err);
    res.status(500).json({ error: "Failed to apply coupon." });
  }
});

async function checkUserExist(userId) {
  if (!mongoose.isValidObjectId(userId)) {
    return false;
  }

  try {
    const user = await User.findById(userId);
    return user !== null;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}
async function calculateTotalPrice(items) {
  try {
    if (!Array.isArray(items)) {
      return {
        success: false,
        statusCode: 400,
        error: { message: "Invalid request data." },
      };
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

    return { success: true, totalPrice: total };
  } catch (err) {
    console.error("Error calculating total price:", err);
    return {
      success: false,
      statusCode: 500,
      error: { message: "Failed to calculate total price." },
    };
  }
}

module.exports = router;
