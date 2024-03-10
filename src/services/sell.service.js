import Sell from "../models/Sell.model.js";

const findAllItemSellService = () => Sell.find();
7
const createItemSellService = (body) => Sell.create(body);

const updateByIdItemSellService = (item, size, amount, color) =>
  Sell.findByIdAndUpdate({ _id: id }, { item, size, amount, color });


export {
  createItemSellService,
  updateByIdItemSellService,
  findAllItemSellService,
}