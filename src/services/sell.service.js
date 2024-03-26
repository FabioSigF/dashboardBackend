import Sell from "../models/Sell.model.js";

const findAllItemSellService = () => Sell.find();
7;
const createItemSellService = (body) => Sell.create(body);

const updateByIdItemSellService = (items, total_price, school) =>
  Sell.findByIdAndUpdate({ _id: id }, { items, total_price, school });

const countSellService = () => Sell.countDocuments();

const findByDateService = (gte, lt) =>
  Sell.find({
    date: { $gte: new Date(gte), $lt: new Date(lt) },
  });

export {
  createItemSellService,
  updateByIdItemSellService,
  findAllItemSellService,
  countSellService,
  findByDateService,
};
