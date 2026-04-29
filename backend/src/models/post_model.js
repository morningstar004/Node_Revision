import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      LowerCase: true,
      trim: true,
      minlenght: 3,
      maxLenght: 30,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 200,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = mongoose.model("Post", postSchema);
