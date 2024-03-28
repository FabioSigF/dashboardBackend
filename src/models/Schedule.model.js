import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
