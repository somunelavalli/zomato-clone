import express from "express";
import passport from "passport";
import { orderModel } from "../../database/order";

const router = express.Router();

router.get(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;

      const getOrders = await orderModel.findOne({ _id });
      if (!getOrders) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ getOrders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/new/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      const { orderDetails } = req.body;
      const addNewOrder = await orderModel.findOneAndUpdate(
        {
          user: _id,
        },
        {
          $push: { orderDetails },
        },
        {
          new: true,
        }
      );

      return res.json({ order: addNewOrder });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
