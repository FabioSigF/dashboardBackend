import mongoose from "mongoose";

const UniformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  colors: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
});

// const Uniform = mongoose.model("Uniform", UniformSchema);
export default UniformSchema;
