import Sell from "../models/Sell.model.js";

const findAllItemSellService = () => Sell.find();
7
const createItemSellService = (body) => Sell.create(body);

const updateByIdItemSellService = (items, total_price, school) =>
  Sell.findByIdAndUpdate({ _id: id }, { items, total_price, school});


export {
  createItemSellService,
  updateByIdItemSellService,
  findAllItemSellService,
}