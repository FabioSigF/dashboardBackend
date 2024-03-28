import School from '../models/School.model.js';

const createSchoolService = (body) => School.create(body);

const getAllSchoolService = () => School.find();

const findSchoolByIdService = (id) => School.findById(id);

const updateSchoolByIdService = (id, name, category, colors, sizes) =>
  School.findByIdAndUpdate(
    { _id: id },
    { name, category, colors, sizes }
  );

const deleteSchoolByIdService = (id) => School.findOneAndDelete(id);

export {
  createSchoolService,
  getAllSchoolService,
  findSchoolByIdService,
  updateSchoolByIdService,
  deleteSchoolByIdService
}