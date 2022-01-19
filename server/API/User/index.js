import express from "express";

import { userModel } from "../../database/user";

const router = express.Router();

router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const getUser = await userModel.findById(_id);
    if (!getUser) return res.status(404).json({ error: "User not found" });
    return res.json({ user: getUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/update/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { userData } = req.body;
    const updatedUserData = await userModel.findByIdAndUpdate(
      userid,
      {
        $set: userData,
      },
      {
        new: true,
      }
    );
    return res.json({ user: updatedUserData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
