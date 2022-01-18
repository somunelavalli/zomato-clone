import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    isContainsEgg: { type: Boolean, required: true },
    category: { type: String, required: true },
    images: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
    },
    price: { type: Number, default: 150, required: true },
    addOns: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Food",
      },
    ],
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const foodModel = mongoose.model("Food", foodSchema);
