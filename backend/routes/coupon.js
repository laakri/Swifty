const express = require("express");
const { async } = require("rxjs");
const router = express.Router();
const Coupon = require("../models/coupon");

// Function to add a new coupon
router.post("/add-coupon", async (req, res) => {
  try {
    const { code, discount, validFrom, validTo, maxUsage } = req.body;
    const coupon = new Coupon({
      code,
      discount,
      validFrom,
      validTo,
      maxUsage,
      currentUsage: 0,
      isActive: true,
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

router.delete(
  "delete/:id",
  (exports.deleteCouponById = async (req, res) => {
    const couponId = req.params.id;

    try {
      // Find the coupon by its ID
      const coupon = await Coupon.findById(couponId);

      if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
      }

      // Delete the coupon from the database
      await coupon.remove();

      res.json({ message: "Coupon deleted successfully" });
    } catch (err) {
      console.error("Error deleting coupon:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  })
);
module.exports = router;
