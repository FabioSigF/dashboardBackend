import {
  findAllScheduleService,
  createScheduleService,
  updateByIdScheduleService,
  findScheduleByDateService,
  deleteScheduleByIdService
} from "../services/schedule.service.js";

const create = async (req, res) => {
  try {
    const { title, type, appointmentDate, isDone } = req.body;

    if (!title || !type || !appointmentDate || isDone) {
      return res.status(400).send({
        message:
          "Não foi possível criar um novo compromisso! Todos os campos devem ser preenchidos.",
      });
    }

    await createScheduleService({
      title,
      type,
      appointmentDate,
      isDone,
    });

    return res
      .status(201)
      .send({ message: "Compromisso marcado com sucesso!" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findAll = async (_, res) => {
  try {
    const appointments = await findAllScheduleService();

    if (appointments.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existem compromissos ainda." });
    }

    return res.send(appointments);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { title, type, appointmentDate, isDone } = req.body;
    const { id } = req.params;

    await updateByIdScheduleService(id, title, type, appointmentDate, isDone);

    return res
      .status(200)
      .send({ message: "Compromisso foi atualizado com sucesso!" });
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
          "Não foi possível encontrar compromissos! Você deve informar a data inicial e a data final de busca.",
      });
    }

    const newDateGte = date_gte.split("-");
    const newDateLt = date_lt.split("-");

    const appointments = await findScheduleByDateService(newDateGte, newDateLt);

    if (appointments.length === 0) {
      return res
        .status(400)
        .send({ message: "Não há compromissos nesse período." });
    }

    return res.send(appointments);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteScheduleByIdService(id);

    return res.send({ message: "Compromisso foi removido com sucesso!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
export { create, findAll, updateById, findByDate, deleteById };
