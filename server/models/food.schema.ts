import { Schema, model } from "mongoose";

const appConfig = useAppConfig();

const FoodSchema = new Schema<DFood>(
  {
    name: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: appConfig.categoryOptions,
      },
      required: true,
    },
    description: {
      type: String,
    },
    is_displayed: {
      type: Boolean,
      required: true,
      default: false,
    },
    nutritional_value: {
      type: {
        protein: {
          type: Number,
          required: true,
        },
        carbs: {
          type: Number,
          required: true,
        },
        fat: {
          type: Number,
          required: true,
        },
        fiber: {
          type: Number,
          required: true,
        },
      },
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("Food", FoodSchema);
