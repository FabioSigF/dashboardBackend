import Stock from "../models/Stock.model.js";

const findAllItemStockService = () => Stock.find();
7
const createItemStockService = (body) => Stock.create(body);

const updateByIdItemStockService = (item, company, size, amount, color) =>
  Stock.findByIdAndUpdate({ _id: id }, { item, company, size, amount, color });

const findStockByIdCompanyService = (id) => Stock.find({company: id});

export {
  createItemStockService,
  updateByIdItemStockService,
  findAllItemStockService,
  findStockByIdCompanyService
}