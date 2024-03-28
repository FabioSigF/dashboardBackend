import mongoose from "mongoose";

const UniformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  price_unit: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true
  }
});

// const Uniform = mongoose.model("Uniform", UniformSchema);
export default UniformSchema;
