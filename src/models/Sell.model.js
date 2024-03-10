import mongoose from "mongoose";

const SellSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId, //pega do estoque
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
  }
}, {collection: "sellings"});

const Sell = mongoose.model("Sell", SellSchema);
export default Sell;
