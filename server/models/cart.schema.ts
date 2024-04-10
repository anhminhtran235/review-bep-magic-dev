import { Schema, model } from "mongoose";

const CartSchema = new Schema<DCart>(
  {
    orders: {
      type: [
        {
          food_id: {
            type: Schema.Types.ObjectId,
            ref: "Food",
            required: true,
          },
          quantity: {
            type: Number,
            min: 1,
            max: 10,
            required: true,
          },
        },
      ],
      required: true,
    },
    grand_total: {
      type: Number,
      min: 0,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    delivery_address: {
      type: String,
      required: true,
    },
    is_resolved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("Cart", CartSchema);
