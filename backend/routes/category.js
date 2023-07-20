// Assuming you have already set up the required dependencies and connected to the MongoDB database
const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// POST /categories
router.post("/add-categorie", async (req, res) => {
  try {
    const { name, gender } = req.body;

    // Create a new category object
    const category = new Category({ name, gender });

    // Save the category to the database
    await category.save();

    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});
// GET /categories
router.get("/get-categories", async (req, res) => {
  try {
    // Retrieve all categories from the database
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});
// PUT /categories/:id
router.put("/update-categories/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, gender } = req.body;

    // Find the category in the database by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the category fields
    category.name = name;
    category.gender = gender;

    // Save the updated category to the database
    await category.save();

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// DELETE /categories/:id
router.delete("/delete-categories/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category in the database by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the category from the database
    await category.remove();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
