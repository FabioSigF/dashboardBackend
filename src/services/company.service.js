import Company from "../models/Company.model.js";

const createCompanyService = (body) => Company.create(body);

const getAllCompanyService = () => Company.find();

const findCompanyByIdService = (id) => Company.findById(id);

const updateCompanyByIdService = (
  id,
  name,
  cnpj,
  category,
  clothing,
  tel,
  cel
) =>
  Company.findByIdAndUpdate(
    { _id: id },
    { name, cnpj, category, clothing, tel, cel }
  );

const deleteCompanyByIdService = (id) => Company.findOneAndDelete({ _id: id });

export {
  createCompanyService,
  getAllCompanyService,
  findCompanyByIdService,
  updateCompanyByIdService,
  deleteCompanyByIdService,
};
