import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    mapLocation: { type: String, required: true },
    cuisine: [String],
    restaurantTimings: String,
    contactNumber: Number,
    website: String,
    popularDishes: [String],
    averageCost: Number,
    amenties: [String],
    menuImages: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
    },
    menu: {
      type: mongoose.Types.ObjectId,
      ref: "Menu",
    },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    photos: { type: mongoose.Types.ObjectId, ref: "Image" },
  },
  {
    timestamps: true,
  }
);

export const menuModel = mongoose.model("Restaurant", restaurantSchema);
