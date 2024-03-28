import Schedule from "../models/Schedule.model.js";

const findAllScheduleService = () => Schedule.find();

const createScheduleService = (body) => Schedule.create(body);

const updateByIdScheduleService = (id, title, type, appointmentDate, isDone) =>
  Schedule.findByIdAndUpdate(
    { _id: id },
    { title, type, appointmentDate, isDone }
  );

const findScheduleByDateService = (gte, lt) =>
  Schedule.find({
    appointmentDate: { $gte: new Date(gte), $lt: new Date(lt) },
  });

const deleteScheduleByIdService = (id) => Schedule.findOneAndDelete(id);

export {
  findAllScheduleService,
  createScheduleService,
  updateByIdScheduleService,
  findScheduleByDateService,
  deleteScheduleByIdService
}