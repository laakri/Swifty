const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
couponSchema.plugin(uniqueValidator);

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
