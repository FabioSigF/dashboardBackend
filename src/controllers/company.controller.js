import { createCompanyService, getAllCompanyService } from "../services/company.service.js";

const create = async (req, res) => {
  try {
    const { name, cnpj, category, sizes, tel, cel } = req.body;

    if (!name || !cnpj || !category || !sizes || !tel || !cel) {
      return res.status(400).send({
        message: "Preencha todos os campos.",
      });
    }

    await createCompanyService({
      name,
      cnpj,
      category,
      sizes,
      tel,
      cel,
    });

    return res.status(201).send({ message: "Empresa criada com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro na criação da empresa." });
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

export { create, getAll };
