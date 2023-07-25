const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

categorySchema.plugin(uniqueValidator);
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
