import express from "express";
import { foodModel } from "../../database/food/index";
import { ValidateRestaurantId, Validatecategory } from "../../Validation/food";
const router = express.Router();

router.get("/r/:_id", async (req, res) => {
  try {
    await ValidateRestaurantId(req.params);
    const { _id } = req.params;
    const foods = await foodModel.find({ restaurant: _id });
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/r/:category", async (req, res) => {
  try {
    await Validatecategory(req.params);
    const { category } = req.params;
    const foods = await foodModel.find({
      category: { $regexp: category, $options: "i" },
    });

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
