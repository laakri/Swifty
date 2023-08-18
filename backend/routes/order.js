const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/prod");
const Coupon = require("../models/coupon");
const User = require("../models/user");
const Notification = require("../models/notification");
const mongoose = require("mongoose");

/****************** Add New Order ******************/
router.post("/order", async (req, res) => {
  try {
    const {
      user,
      products,
      shippingAddress,
      phone,
      email,
      name,
      lastname,
      couponId,
    } = req.body;

    const orderUser = user ? user : null;

    let totalAmount = 0;

    if (Array.isArray(products) && products.length > 0) {
      const totalPriceResponse = await calculateTotalPrice(products);
      if (!totalPriceResponse.success) {
        return res
          .status(totalPriceResponse.statusCode)
          .json(totalPriceResponse.error);
      }
      totalAmount = totalPriceResponse.totalPrice;
    }

    if (couponId) {
      const coupon = await Coupon.findById(couponId);

      if (!coupon) {
        return res.status(400).json({ error: "Invalid coupon." });
      }

      const currentDate = new Date();
      if (
        currentDate > coupon.validTo ||
        coupon.currentUsage >= coupon.maxUsage
      ) {
        coupon.isActive = false;
        coupon.usedByUsers = [];
        await coupon.save();

        return res.status(400).json({ error: "Coupon has expired." });
      }
      coupon.currentUsage += 1;
      coupon.usedByUsers.push(user);
      await coupon.save();
      totalAmount *= 1 - coupon.discount / 100;
    }

    if (Array.isArray(products) && products.length > 0) {
      for (const product of products) {
        const purchasedQuantity = product.quantity;
        const productId = product.productId;

        // Update purchases count
        await Product.findByIdAndUpdate(
          productId,
          { $inc: { purchases: purchasedQuantity } },
          { new: true }
        );

        // Reduce product quantity in stock
        await Product.findByIdAndUpdate(
          productId,
          { $inc: { quantity: -purchasedQuantity } },
          { new: true }
        );
      }
    }

    const newOrder = new Order({
      user: orderUser,
      products,
      totalAmount,
      shippingAddress,
      phone,
      email,
      name,
      lastname,
      couponId: couponId ? couponId : null,
    });

    const savedOrder = await newOrder.save();

    // Create notification for new order
    const newOrderNotification = new Notification({
      type: "info",
      title: "New Order Received",
      message: `A new order has been placed! Order code: ${savedOrder.orderId}`,
    });
    const newOrdersavedNotification = await newOrderNotification.save();
    Notification.emit("newNotification", newOrdersavedNotification);

    // Check stock and create notifications
    await checkStockAndCreateNotifications(products);

    res.status(201).json(savedOrder.orderId);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add the order." });
  }
});
/****************** Check Stock and Create Notifications ******************/
async function checkStockAndCreateNotifications(products) {
  for (const product of products) {
    const purchasedQuantity = product.quantity;
    const productId = product.productId;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      // Handle if product not found
      continue;
    }

    if (existingProduct.quantity === 0) {
      const outOfStockNotification = new Notification({
        type: "error",
        title: "Out of Stock Alert",
        message: `Product "${existingProduct.name}" is out of stock.`,
      });

      const outOfStocksavedNotification = await outOfStockNotification.save();

      Notification.emit("newNotification", outOfStocksavedNotification);
    } else if (existingProduct.quantity <= 10) {
      const lowStockNotification = new Notification({
        type: "warning",
        title: "Low Stock Alert",
        message: `Product "${existingProduct.name}" is running low on stock.`,
      });
      const lowStocksavedNotification = await lowStockNotification.save();
      Notification.emit("newNotification", lowStocksavedNotification);
    }
  }
}

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

    if (coupon.currentUsage >= coupon.maxUsage) {
      return res
        .status(400)
        .json({ error: "Coupon is reached the usage limit." });
    }

    // Mark the coupon as used by the current user
    // coupon.usedByUsers.push(userId);
    //await coupon.save();
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
/****************** checkUserExist ******************/

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
/****************** calculateTotalPrice ******************/

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
/****************** GET orders by userID ******************/

router.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch orders using the userID
    const orders = await Order.find({ user: userId }).populate({
      path: "products.productId",
      select: "_id name price category images",
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
});

module.exports = router;
