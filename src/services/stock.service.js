import Stock from "../models/Stock.model.js";

const findAllItemStockService = () => Stock.find();

const findStockById = (id) => Stock.findById(id);

const createItemStockService = (body) => Stock.create(body);

const updateByIdItemStockService = (item, company, size, amount, color) =>
  Stock.findByIdAndUpdate({ _id: id }, { item, company, size, amount, color });

const findStockByIdCompanyService = (id) => Stock.find({ company: id });

const deleteStockItemById = (id) => Stock.findOneAndDelete({ _id: id });

export {
  createItemStockService,
  updateByIdItemStockService,
  findAllItemStockService,
  findStockByIdCompanyService,
  deleteStockItemById,
  findStockById
};
