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

router.post("/add-product", upload.array("images"), (req, res) => {
  const images = req.files.map((file) => {
    return { url: file.path };
  });

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    category: req.body.category,
    quantity: req.body.quantity,
    images: images,
    specifications: req.body.specifications,
    tags: req.body.tags,
    isFeatured: req.body.isFeatured,
  });
  console.log(req.body);

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product added successfully",
        product: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to add product",
        error: error,
      });
    });
});

module.exports = router;

/*


*****************-Add Prod-*********
router.post(
  "/AddProduct",
  multer({ storage: storage }).array("images"),

  async (req, res) => {
    try {
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

      const savedProduct = await Product.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to create the product" });
    }
  }
);*/
