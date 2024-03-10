import {
  createItemSellService,
  updateByIdItemSellService,
  findAllItemSellService,
} from "../services/sell.service.js";

const create = async (req, res) => {
  try {
    const { item, size, amount, color } = req.body;

    if (!item || !size || !amount) {
      return res
        .status(400)
        .send({ message: "Todos os campos devem ser preenchidos." });
    }

    await createItemSellService({
      item,
      size,
      amount,
      color,
    });

    return res
      .status(201)
      .send({ message: "Venda realizada com sucesso!" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findAll = async (req, res) => {
  try {
    const stock = await findAllItemSellService();

    if (stock.length === 0) {
      return res
        .status(400)
        .send({ message: "Não há itens vendidos ainda." });
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

    await updateByIdItemSellService(
      id,
      item,
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
