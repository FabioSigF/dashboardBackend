//O papel do service é se conectar com o banco
import User from "../models/User.model.js";

const createService = (body) => User.create(body);
const findAllService = () => User.find();
const findByIdService = (id) => User.findById(id);
const updateByIdService = (id, username, email, password) =>
  User.findByIdAndUpdate({ _id: id }, { username, email, password });

export default {
  createService,
  findAllService,
  findByIdService,
  updateByIdService,
};
