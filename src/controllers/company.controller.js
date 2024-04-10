import {
  createCompanyService,
  findCompanyByIdService,
  getAllCompanyService,
  updateCompanyByIdService,
  deleteCompanyByIdService
} from "../services/company.service.js";

const create = async (req, res) => {
  try {
    const { name, cnpj, category, colors, sizes, tel, cel } = req.body;

    if (!name || !category || !sizes) {
      return res.status(400).send({
        message: "Preencha todos os campos.",
      });
    }

    await createCompanyService({
      name,
      cnpj,
      category,
      colors,
      sizes,
      tel,
      cel,
    });

    return res.status(201).send({ message: "Empresa cadastrada com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro ao cadastrar da empresa." });
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
    const { name, cnpj, category, colors, sizes, tel, cel } = req.body;
    const { id } = req.params;

    if (!name && !cnpj && !category && !colors && !sizes && !tel && !cel) {
      return res.status(400).send({
        message:
          "Não foi possível atualizar a empresa! Pelo menos um campo deve ser preenchido.",
      });
    }

    await updateCompanyByIdService(id, name, cnpj, category, colors, sizes, tel, cel);

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

    return res.status(200).send({ message: "Empresa excluída com sucesso!" });
  } catch (error) {
    return res.status(500).send({ message: err.message });
  }
};

export { create, getAll, getById, updateById, deleteById };
