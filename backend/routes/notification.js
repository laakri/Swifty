const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");

router.get("/notifications", async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const notifications = await Notification.find();

    notifications.forEach((notification) => {
      res.write(`data: ${JSON.stringify(notification)}\n\n`);
    });

    const listener = (notification) => {
      res.write(`data: ${JSON.stringify(notification)}\n\n`);
    };

    Notification.on("newNotification", listener);

    req.on("close", () => {
      Notification.off("newNotification", listener);
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Error fetching notifications" });
  }
});
router.get("/unseen-count", async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    let unseenCount;
    const updateUnseenCount = async () => {
      try {
        unseenCount = await Notification.countDocuments({ seen: false });
        res.write(`data: ${JSON.stringify({ unseenCount })}\n\n`);
      } catch (error) {
        console.error("Error getting unseen notification count:", error);
      }
    };

    // Call the function initially to send the initial count
    updateUnseenCount();

    const listener = () => {
      updateUnseenCount();
    };

    Notification.on("newNotification", () => {
      updateUnseenCount();
      res.write(
        `event: unseenCountUpdate\ndata: ${JSON.stringify({ unseenCount })}\n\n`
      );
    });

    req.on("close", () => {
      Notification.off("newNotification", listener);
    });
  } catch (error) {
    console.error("Error setting up SSE for unseen notification count:", error);
    res
      .status(500)
      .json({ error: "Error setting up SSE for unseen notification count" });
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
