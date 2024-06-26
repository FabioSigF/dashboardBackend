import Sell from "../models/Sell.model.js";

const findAllItemSellService = (limit, offset) =>
  Sell.find()
    .sort({ date: -1 })
    .skip(offset)
    .limit(limit)
    .populate("company")
    .exec();

const createItemSellService = (body) => Sell.create(body);

const updateByIdItemSellService = (id, items, total_price, school) =>
  Sell.findByIdAndUpdate({ _id: id }, { items, total_price, school });

const countSellService = () => Sell.countDocuments();

const findSellByDateService = (gte, lt) =>
  Sell.find({
    date: { $gte: new Date(gte), $lt: new Date(lt) },
  });

const findSellByCompanyService = (id) => Sell.find({ company: id });

const findSellingsByCompanyAndDateService = (id, gte, lt) =>
  Sell.find({ company: id , date: { $gte: new Date(gte), $lt: new Date(lt) } });

const findSellByIdService = (id) => Sell.findById(id);

const deleteSellByIdService = (id) => Sell.findOneAndDelete({ _id: id });

export {
  createItemSellService,
  updateByIdItemSellService,
  findAllItemSellService,
  countSellService,
  findSellByDateService,
  findSellByCompanyService,
  deleteSellByIdService,
  findSellByIdService,
  findSellingsByCompanyAndDateService,
};
