import express from "express";
import { menuModel } from "../../database/menu/index";
import { imageModel } from "../../database/images";

const router = express.Router();

router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menus = await menuModel.findById(_id);
    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menus = await imageModel.findOne(_id);
    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
