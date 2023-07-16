const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/prod");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/jpg": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/file-folder");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage });

/****************** Add Product ******************/

router.post("/add-product", upload.array("images"), async (req, res) => {
  try {
    console.log(req.body.images); // Console log the files/images array

    const url = req.protocol + "://" + req.get("host");

    const {
      name,
      price,
      shortDescription,
      description,
      category,
      quantity,
      specifications,
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

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create the product" });
  }
});

module.exports = router;
