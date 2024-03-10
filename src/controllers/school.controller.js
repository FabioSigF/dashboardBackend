import {
  createSchoolService,
  getAllSchoolService,
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

export { create, getAll };
