import mongoose from "mongoose";
import Uniform from "./Uniform.model";

const SellSchema = new mongoose.Schema({
  items: {
    type: [Uniform],
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {collection: "sellings"});

const Sell = mongoose.model("Sell", SellSchema);
export default Sell;
