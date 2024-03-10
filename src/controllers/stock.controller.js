import {
  createItemStockService,
  updateByIdItemStockService,
  findAllItemStockService,
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
    const id = req.id;

    if (!item && !company && !size && !amount && !color) {
      return res
        .status(400)
        .send({ message: "Pelo menos um campo deve ser preenchido." });
    }

    await updateByIdItemStockService(
      id,
      item,
      company,
      size,
      amount,
      color
    );

    return res
      .status(200)
      .send({ message: "Item no estoque foi atualizado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
export { create, findAll, updateById };
