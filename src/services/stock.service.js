import Stock from "../models/Stock.model.js";

const findAllItemStockService = () => Stock.find();

const findStockByIdService = (id) => Stock.findById(id);

const createItemStockService = (body) => Stock.create(body);

const updateByIdItemStockService = (id, item, company, size, amount, color) =>
  Stock.findByIdAndUpdate({ _id: id }, { item, company, size, amount, color });

const findStockByIdCompanyService = (id) => Stock.find({ company: id });

//Retorna itens que possuem amout menor ou igual ao fornecido
const findStockByAmountService = (amount) => Stock.find({ amount: { $lte: amount } });

const findStockByAmountAndCompanyService = (amount, id) => Stock.find({ _id: id, amount: { $lte: amount } });

const deleteStockItemByIdService = (id) => Stock.findOneAndDelete({ _id: id });

export {
  createItemStockService,
  updateByIdItemStockService,
  findAllItemStockService,
  findStockByIdCompanyService,
  deleteStockItemByIdService,
  findStockByIdService,
  findStockByAmountService,
  findStockByAmountAndCompanyService
};
