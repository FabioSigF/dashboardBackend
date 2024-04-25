import {
  createCompanyService,
  findCompanyByIdService,
  getAllCompanyService,
  updateCompanyByIdService,
  deleteCompanyByIdService,
} from "../services/company.service.js";
import {
  createItemStockService,
  deleteStockItemByIdService,
  findStockByIdCompanyService,
} from "../services/stock.service.js";

const create = async (req, res) => {
  try {
    const { name, cnpj, category, clothing, tel, cel } = req.body;

    if (!name || !category || !clothing) {
      return res.status(400).send({
        message: "Preencha todos os campos.",
      });
    }

    const newCompany = await createCompanyService({
      name,
      cnpj,
      category,
      clothing,
      tel,
      cel,
    });

    for (const cloth of newCompany.clothing) {
      const sizes = cloth.sizes;
      const colors = cloth.colors;

      // Iterar sobre cada tamanho e cor da peça de roupa
      for (const clothSize of sizes) {
        for (const clothColor of colors) {
          // Criar um item de estoque para a combinação de tamanho e cor
          await createItemStockService({
            item: cloth.name,
            company: newCompany._id,
            size: clothSize,
            amount: 0, // Quantidade inicial zero
            color: clothColor,
          });
        }
      }
    }

    return res.status(201).send({ message: "Empresa cadastrada com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ocorreu um erro ao cadastrar da empresa. ${error}` });
  }
};

const getAll = async (_, res) => {
  try {
    const companies = await getAllCompanyService();
    if (companies.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existem empresas cadastradas." });
    }
    return res.send(companies);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await findCompanyByIdService(id);

    return res.send(company);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateById = async (req, res) => {
  try {
    const { name, cnpj, category, clothing, tel, cel } = req.body;
    const { id } = req.params;

    if (!name && !cnpj && !category && !clothing && !tel && !cel) {
      return res.status(400).send({
        message:
          "Não foi possível atualizar a empresa! Pelo menos um campo deve ser preenchido.",
      });
    }

    await updateCompanyByIdService(
      id,
      name,
      cnpj,
      category,
      clothing,
      tel,
      cel
    );

    return res
      .status(200)
      .send({ message: "Empresa foi atualizada com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCompanyByIdService(id);

    const stock = await findStockByIdCompanyService(id);

    stock.forEach(async (item) => {
      await deleteStockItemByIdService(item._id);
    });
    
    return res.status(200).send({ message: "Empresa excluída com sucesso!" });
  } catch (error) {
    return res.status(500).send({ message: err.message });
  }
};

export { create, getAll, getById, updateById, deleteById };
