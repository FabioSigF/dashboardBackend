import {
  createItemStockService,
  findAllItemStockService,
  updateByIdItemStockService,
  findStockByIdCompanyService,
  deleteStockItemByIdService,
  findStockByAmountService,
  findStockByAmountAndCompanyService,
} from "../services/stock.service.js";

const create = async (req, res) => {
  try {
    const { item, company, size, amount, color } = req.body;

    if (!item || !company || !size || !amount) {
      return res
        .status(400)
        .send({ message: "Todos os campos devem ser preenchidos." });
    }

    await createItemStockService({
      item,
      company,
      size,
      amount,
      color,
    });

    return res
      .status(201)
      .send({ message: "Item adicionado ao estoque com sucesso!" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findAll = async (req, res) => {
  try {
    const stock = await findAllItemStockService();

    if (stock.length === 0) {
      return res
        .status(400)
        .send({ message: "Não há itens cadastrados no estoque." });
    }

    return res.send(stock);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { item, company, size, amount, color } = req.body;
    const { id } = req.params;

    if (!item && !company && !size && !amount && !color) {
      return res
        .status(400)
        .send({ message: "Pelo menos um campo deve ser preenchido." });
    }

    await updateByIdItemStockService(id, item, company, size, amount, color);

    return res
      .status(200)
      .send({ message: "Item no estoque foi atualizado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findByIdCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await findStockByIdCompanyService(id);

    if (stock.length == 0) {
      return res
        .status(400)
        .send({ message: "Não existem vendas dessa empresa." });
    }

    return res.send(stock);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteStockItemByIdService(id);

    return res.send({ message: "Item do estoque removido com sucesso!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findByAmount = async (req, res) => {
  try {
    const { amount } = req.params;
    const response = await findStockByAmountService(amount);

    if (res !== null || res.length == 0) {
      return res.send(response);
    } else
      return res.send({
        message: `Não há itens com ${amount} ou menos unidades no estoque.`,
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findByAmountAndCompany = async (req, res) => {
  try {
    const { amount, id } = req.params;
    const response = await findStockByAmountAndCompanyService(amount, id);
    if (res !== null || res.length == 0) {
      return res.send(response);
    } else
      return res.send({
        message: `Não há itens com ${amount} ou menos unidades no estoque.`,
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
export {
  create,
  findAll,
  updateById,
  findByIdCompany,
  deleteById,
  findByAmount,
  findByAmountAndCompany
};
