import { Schema, model } from "mongoose";

// ATTENTION! NEED CHANGING IN VALIDATOR WHEN ADDING MORE USER!
const UserSchema = new Schema<DUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  notification_token: {
    type: String,
  },
});

export default model("User", UserSchema);
