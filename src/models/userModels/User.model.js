import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    subject: [
      {
        type: String,
      },
    ],
    imageProfile: {
        type: String,
        required: false,
      },
    password: {
      type: String,
      required: true,
    },
    delete_status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
