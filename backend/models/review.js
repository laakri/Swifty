const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  // Define the review schema fields
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
