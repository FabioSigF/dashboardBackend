import School from '../models/School.model.js';

const createSchoolService = (body) => School.create(body);

const getAllSchoolService = () => School.find();

const findSchoolbyIdService = (id) => School.findById(id);

export {
  createSchoolService,
  getAllSchoolService,
  findSchoolbyIdService
}