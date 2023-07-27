const express = require("express");
const { async } = require("rxjs");
const router = express.Router();
const Coupon = require("../models/coupon");

// Function to add a new coupon
router.post("/add-coupon", async (req, res) => {
  try {
    const { code, discount, validFrom, validTo } = req.body;
    const coupon = new Coupon({
      code,
      discount,
      validFrom,
      validTo,
    });

    const savedCoupon = await coupon.save();
    res.status(201).json(savedCoupon);
  } catch (err) {
    res.status(500).json({ message: "Coupon creation failed" });
  }
});

router.get("/get-coupons", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ error: "Failed to fetch coupons" });
  }
});
module.exports = router;
