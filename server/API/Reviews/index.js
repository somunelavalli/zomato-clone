import express from "express";

import { reviewsModel } from "../../database/reviews";

const router = express.Router();

router.get("/:restid", async (req, res) => {
  try {
    const { restid } = req.params;
    const reviews = await reviewsModel.find({ restaurant: restid });
    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { reviewDetails } = req.body;
    await reviewsModel.create({
      ...reviewDetails,
    });
    return res.json({ review: "Successfully Created A Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await reviewsModel.findByIdAndDelete({
      _id,
    });
    return res.json({ review: "Successfully Deleted A Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
