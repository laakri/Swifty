const express = require("express");
const Review = require("../models/review");
const Product = require("../models/prod");
const User = require("../models/user");
const router = express.Router();

// POST /products/:productId/reviews
router.post("/:productId/reviews", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { rating, comment, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingReview = await Review.findOne({ productId, userId });
    console.log(existingReview);
    if (existingReview) {
      return res.status(409).json({
        message: "You have already submitted a review for this product",
      });
    }
    const review = new Review({ productId, userId, rating, comment });
    await review.save();
    product.reviews.push(review._id);

    await product.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
