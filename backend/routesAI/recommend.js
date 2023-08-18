const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/recommend", (req, res) => {
  const userData = req.body; // User data from frontend
  const pythonProcess = spawn("python", ["./recommendation_system.py"]);

  pythonProcess.stdout.on("data", (data) => {
    const recommendations = JSON.parse(data.toString());
    res.json(recommendations);
  });
});

module.exports = router;
