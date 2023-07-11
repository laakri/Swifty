const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/prod");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/file-profile");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

/******************-Add Prod-**********/
router.post(
  "/products",
  multer({ storage: storage }).array("images"),

  async (req, res) => {
    try {
      const specifications = [
        { name: "Color", value: "Black" },
        { name: "Size", value: "Large" },
      ];
      const url = req.protocol + "://" + req.get("host");

      const {
        name,
        price,
        shortDescription,
        description,
        category,
        quantity,

        tags,
        isFeatured,
      } = req.body;

      const images = req.files.map((file) => ({
        url: url + "/backend/file-folder/" + file.filename,
      }));

      const product = new Product({
        name,
        price,
        shortDescription,
        description,
        category,
        quantity,
        images,
        specifications,
        tags,
        isFeatured,
      });

      const savedProduct = await Product.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to create the product" });
    }
  }
);

module.exports = router;
