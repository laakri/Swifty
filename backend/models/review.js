const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  // Define the review schema fields
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
