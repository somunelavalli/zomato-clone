import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    food: { type: mongoose.Types.ObjectId, ref: "Food" },
    restaurant: { type: mongoose.Types.ObjectId, ref: "Restaurant" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    isRestaurantReview: { type: Boolean },
    isFoodReview: { type: Boolean },
    photos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Image",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const reviewsModel = mongoose.model("Review", reviewsSchema);
