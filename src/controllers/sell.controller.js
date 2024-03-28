import {
  createItemSellService,
  updateByIdItemSellService,
  findAllItemSellService,
  findSellByDateService,
  findSellByCompanyService,
} from "../services/sell.service.js";

import { findSchoolbyIdService } from "../services/school.service.js";

const create = async (req, res) => {
  try {
    const { items, total_price, school } = req.body;

    if (!items || !total_price || !school) {
      return res.status(400).send({
        message:
          "Não foi possível concluir a venda! Todos os campos devem ser preenchidos.",
      });
    }
    
    const schoolId = await findSchoolbyIdService(school);

    await createItemSellService({
      items,
      total_price,
      school: schoolId._id,
    });

    return res.status(201).send({ message: "Venda realizada com sucesso!" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findAll = async (req, res) => {
  try {
    const sellings = await findAllItemSellService();

    if (sellings.length === 0) {
      return res.status(400).send({ message: "Não há itens vendidos ainda." });
    }

    return res.send(sellings);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { items, total_price, school } = req.body;
    const id = req.id;

    if (!items && !total_price && !school) {
      return res.status(400).send({
        message:
          "Não foi possível atualizar a venda! Pelo menos um campo deve ser preenchido.",
      });
    }

    await updateByIdItemSellService(items, total_price, school);

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
          "Não foi possível encontrar as vendas! Você deve informar a data inicial e a data final de busca."
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
export { create, findAll, updateById, findByDate, findByIdCompany };
