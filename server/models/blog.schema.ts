import { Schema, model } from "mongoose";

const BlogSchema = new Schema<DBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    banner_url: {
      type: String,
    },
    paragraphs: {
      type: [String],
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

export default model("Blog", BlogSchema);
