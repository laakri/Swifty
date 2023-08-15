const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/prod");
const Category = require("../models/category");

router.get("/analytics", async (req, res) => {
  try {
    const orders = await Order.find();
    const allorders = await Order.countDocuments();
    const totalSales = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const totalOrders = orders.length;
    const confirmedOrders = orders.filter(
      (order) => order.status === "Confirmed"
    ).length;
    const conversionRate = (confirmedOrders / totalOrders) * 100;

    const clients = await User.countDocuments();

    res.json({
      allorders,
      totalSales,
      conversionRate: conversionRate.toFixed(2),
      clients,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching analytics data" });
  }
});

router.get("/revenue-chart-data", async (req, res) => {
  try {
    const dailyRevenueData = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const labels = dailyRevenueData.map((item) => item._id);
    const data = dailyRevenueData.map((item) => item.totalRevenue);

    const dailyRevenueChartData = {
      labels,
      datasets: [
        {
          label: "Daily Revenue",
          data,
          barPercentage: 0.2,
          borderRadius: 5,
          backgroundColor: ["#12b4b1"],
        },
      ],
    };

    res.json(dailyRevenueChartData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching daily revenue chart data" });
  }
});

router.get("/client-chart-data", async (req, res) => {
  try {
    const userRegistrationData = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          numberOfUsers: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const labels = userRegistrationData.map((item) => item._id);
    const data = userRegistrationData.map((item) => item.numberOfUsers);

    const clientChartData = {
      labels,
      datasets: [
        {
          label: "Clients",
          data,
          borderColor: "rgba(255, 99, 132, 0.8)",
          borderWidth: 2,
          fill: false,
          lineTension: 0.5,
        },
      ],
    };

    res.json(clientChartData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching client chart data" });
  }
});

router.get("/category-product-count", async (req, res) => {
  try {
    const categoryProductCountData = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          productCount: { $sum: 1 },
        },
      },
    ]);

    const categoryIds = categoryProductCountData.map((data) =>
      data._id.toString()
    );

    const categoryNames = await Category.find({
      _id: { $in: categoryIds },
    });

    const categoryNameArray = categoryNames.map((category) => category.name);
    const productCountArray = categoryProductCountData.map(
      (data) => data.productCount
    );

    res.json({
      categoryNames: categoryNameArray,
      productCounts: productCountArray,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching category product count data" });
  }
});
router.get("/top-selling-products", async (req, res) => {
  try {
    const topSellingProducts = await Product.aggregate([
      {
        $group: {
          _id: { id: "$_id", name: "$name" }, // Group by both _id and name
          sales: { $sum: "$purchases" },
        },
      },
      {
        $sort: { sales: -1 },
      },
      {
        $limit: 7,
      },
      {
        $project: {
          _id: "$_id.id", // Keep only the _id field for each product
          name: "$_id.name",
          sales: 1,
        },
      },
    ]);

    res.json(topSellingProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top selling products" });
  }
});

module.exports = router;
