import School from '../models/School.model.js';

const createSchoolService = (body) => School.create(body);

const getAllSchoolService = () => School.find();

export {
  createSchoolService,
  getAllSchoolService
}