const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["Men", "Women", "Neutral"],
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
