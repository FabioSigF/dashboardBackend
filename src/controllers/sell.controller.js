import { findCompanyByIdService } from "../services/company.service.js";
import {
  createItemSellService,
  updateByIdItemSellService,
  findAllItemSellService,
  findSellByDateService,
  findSellByCompanyService,
  deleteSellByIdService,
  countSellService,
} from "../services/sell.service.js";

import {
  findStockByIdCompanyService,
  updateByIdItemStockService,
} from "../services/stock.service.js";

const create = async (req, res) => {
  try {
    const { items, total_price, company } = req.body;

    if (!items || !total_price || !company) {
      return res.status(400).send({
        message:
          "Não foi possível concluir a venda! Todos os campos devem ser preenchidos.",
      });
    }

    const companyItem = await findCompanyByIdService(company);

    const stock = await findStockByIdCompanyService(companyItem._id);

    items.forEach(async (itemSell) => {
      const resStock = stock.find(
        (stockItem) =>
          stockItem.item === itemSell.name &&
          stockItem.color === itemSell.color &&
          stockItem.size === itemSell.size
      );

      if (resStock && resStock.amount > 0 && itemSell.amount < resStock.amount) {
        await updateByIdItemStockService(
          resStock._id,
          resStock.item,
          resStock.company,
          resStock.size,
          resStock.amount - 1,
          resStock.color
        );
      } else
        return res
          .status(400)
          .send({
            message:
              "Venda não pode ser realizada. Não há unidades suficientes no estoque!",
          });
    });

    await createItemSellService({
      items,
      total_price,
      company: companyItem._id,
    });

    return res.status(201).send({ message: "Venda realizada com sucesso!" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query; //offset é qual o índice do item inicial. Ele é usado como skip

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }
    if (!offset) {
      offset = 0;
    }

    const sellings = await findAllItemSellService(limit, offset);

    const total = await countSellService();

    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=#${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;

    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=#${limit}&offset=${previous}`
        : null;

    if (sellings.length === 0) {
      return res.status(400).send({ message: "Não existem vendas." });
    }
    return res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      response: sellings.map((sell) => ({
        id: sell._id,
        items: sell.items,
        date: sell.date,
        total_price: sell.total_price,
        company_id: sell.company._id,
        company_name: sell.company.name,
        company_category: sell.company.category,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { items, total_price, company } = req.body;
    const { id } = req.params;

    if (!items && !total_price && !company) {
      return res.status(400).send({
        message:
          "Não foi possível atualizar a venda! Pelo menos um campo deve ser preenchido.",
      });
    }

    await updateByIdItemSellService(id, items, total_price, company);

    return res
      .status(200)
      .send({ message: "Venda foi atualizada com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findByDate = async (req, res) => {
  try {
    const { date_gte, date_lt } = req.body;

    if (!date_gte || !date_lt) {
      return res.status(400).send({
        message:
          "Não foi possível encontrar as vendas! Você deve informar a data inicial e a data final de busca.",
      });
    }

    const newDateGte = date_gte.split("-");
    const newDateLt = date_lt.split("-");

    const sellings = await findSellByDateService(newDateGte, newDateLt);

    if (sellings.length === 0) {
      return res
        .status(400)
        .send({ message: "Não há itens vendidos nesse período." });
    }

    return res.send(sellings);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const findByIdCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const sellings = await findSellByCompanyService(id);

    if (sellings.length == 0) {
      return res
        .status(400)
        .send({ message: "Não existem vendas dessa empresa." });
    }

    return res.send(sellings);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSellByIdService(id);

    return res.send({ message: "Venda removida com sucesso!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export { create, findAll, updateById, findByDate, findByIdCompany, deleteById };
