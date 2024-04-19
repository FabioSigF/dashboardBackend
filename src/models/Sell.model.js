import mongoose from "mongoose";
import SellItemSchema from "./SellItem.model.js";
import Company from "./Company.model.js";

const SellSchema = new mongoose.Schema({
  items: [SellItemSchema],
  total_price: {
    type: Number,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  date: {
    type: Date,
    default: ()=> Date.now() - (3 * 60 * 60 * 1000) // 3 horas subtraídas do momento atual para acertar o horário com o Brasil
  }
}, {collection: "sellings"});

const Sell = mongoose.model("Sell", SellSchema);
export default Sell;
