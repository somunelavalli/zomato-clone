import express from "express";
import { restaurantModel } from "../../database/restaurant/index";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    const restaurants = await restaurantModel.find({ city });
    res.json({ restaurants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await restaurantModel.findById(_id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant Not Found" });
    }
    return res.status(200).json({ restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { searchString } = req.body;
    const restaurants = await restaurantModel.find({
      name: { $regexp: searchString, $options: "i" },
    });
    if (!restaurants) {
      return res
        .status(404)
        .json({ error: `No Restaurant Found with ${searchString}` });
    }
    return res.status(200).json({ restaurants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
