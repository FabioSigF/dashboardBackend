import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .send({ message: "Todos os campos devem ser preenchidos." });
    }

    const user = await userService.createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Erro ao criar usuário." });
    }

    res.status(201).send({
      message: "Usuário criado com sucesso!",
      user: {
        id: user._id,
        username,
        email,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "Não há usuários cadastrados." });
    }

    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const id = req.id;

    if (!username && !email && !password) {
      return res
        .status(400)
        .send({ message: "Pelo menos um campo deve ser preenchido." });
    }

    await userService.updateByIdService(id, username, email, password);

    return res
      .status(200)
      .send({ message: "Usuário foi atualizado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
export default { create, findAll, findById, updateById };
