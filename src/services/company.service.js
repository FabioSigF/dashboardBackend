import Company from '../models/Company.model.js';

const createCompanyService = (body) => Company.create(body);

const getAllCompanyService = () => Company.find();

export {
  createCompanyService,
  getAllCompanyService
}