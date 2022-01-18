import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    orderDetails: [
      {
        food: { type: mongoose.Types.ObjectId, ref: "Food" },
        quantity: { type: Number, required: true },
        paymentType: { type: String, required: true },
        status: { type: String, default: "placed" },
        paymentDetails: {
          itemTotal: { type: Number, required: true },
          promo: { type: Number, required: true },
          tax: { type: Number, required: true },
        },
      },
    ],
    orderRatings: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const orderModel = mongoose.model("Order", orderSchema);
