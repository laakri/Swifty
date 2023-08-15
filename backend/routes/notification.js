const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");

router.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ time: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
});

router.patch("/notifications/mark-read/:id", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { $set: { seen: true } },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: "Error marking notification as read" });
  }
});

module.exports = router;
