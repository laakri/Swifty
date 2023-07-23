const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/prod");
const Review = require("../models/review");

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
      url: url + "/file-folder/" + file.filename,
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

/****************** Get All Products ******************/
const calculateAverageRating = async (productId) => {
  try {
    const reviews = await Review.find({ productId });
    if (reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
const calculateLengthRating = async (productId) => {
  try {
    const reviews = await Review.find({ productId });
    if (reviews.length === 0) {
      return 0;
    }
    return reviews.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
router.get("/products", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const productsCount = await Product.countDocuments();

    const products = await Product.find()
      .select(
        "-specifications -tags -isFeatured -quantity -description -updatedAt -__v "
      )
      .skip(startIndex)
      .limit(limit)
      .exec();

    const productsWithFirstImage = products.map((product) => {
      const firstImage =
        product.images && product.images.length > 0
          ? product.images[0].url
          : null;

      if (firstImage) {
        product.images[0] = { url: firstImage };
      }

      return {
        ...product.toObject(),
        images: firstImage ? [product.images[0]] : [],
      };
    });

    const pagination = {
      totalProducts: productsCount,
      totalPages: Math.ceil(productsCount / limit),
      currentPage: page,
    };

    res.status(200).json({ products: productsWithFirstImage, pagination });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/****************** Get Product By Id ******************/

router.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Calculate the average rating using the custom function
    const averageRating = await calculateAverageRating(productId);
    product.averageRating = averageRating;

    const lengthRating = await calculateLengthRating(productId);
    product.lengthRating = lengthRating;

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/****************** Get Cart Products ******************/
router.post("/get-cart-products", async (req, res) => {
  const { productIds } = req.body;

  try {
    const products = await Product.find({ _id: { $in: productIds } });

    const formattedProducts = products.map((product) => {
      const firstImage =
        product.images.length > 0 ? product.images[0].url : null;
      return {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: firstImage,
      };
    });

    res.json(formattedProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
