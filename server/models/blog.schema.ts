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
  // Viết như này là thay cho mấy dòng kia
  { timestamps: true }
);

export default model("Blog", BlogSchema);
