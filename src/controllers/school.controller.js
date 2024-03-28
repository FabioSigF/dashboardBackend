import {
  createSchoolService,
  getAllSchoolService,
  findSchoolByIdService,
  updateSchoolByIdService,
  deleteSchoolByIdService
} from "../services/school.service.js";

const create = async (req, res) => {
  try {
    const { name, category, colors, sizes } = req.body;

    if (!name || !category || !colors || !sizes) {
      return res.status(400).send({
        message: "Preencha todos os campos.",
      });
    }

    await createSchoolService({
      name,
      category,
      colors,
      sizes,
    });

    return res.status(201).send({ message: "Escola cadastrada com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro no cadastro da escola." });
  }
};

const getAll = async (_, res) => {
  try {
    const schools = await getAllSchoolService();
    if (schools.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existem escolas cadastradas." });
    }
    return res.send(schools);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await findSchoolByIdService(id);

    return res.send(school);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateById = async (req, res) => {
  try {
    const { name, category, colors, sizes } = req.body;
    const { id } = req.params;

    if (!name && !category && !sizes && !colors) {
      return res.status(400).send({
        message:
          "Não foi possível atualizar a escola! Pelo menos um campo deve ser preenchido.",
      });
    }

    await updateSchoolByIdService(id, name, category, colors, sizes);

    return res
      .status(200)
      .send({ message: "Escola foi atualizada com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSchoolByIdService(id);

    return res.status(200).send({ message: "Escola excluída com sucesso!" });
  } catch (error) {
    return res.status(500).send({ message: err.message });
  }
};

export { create, getAll, getById, updateById, deleteById };
