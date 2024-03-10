import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: Array,
  }
}, {collection: "stock"});

const Stock = mongoose.model("Stock", StockSchema);
export default Stock;
