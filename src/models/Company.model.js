import mongoose from "mongoose";
import UniformSchema from "./Uniform.model.js";

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  clothing: {
    type: [UniformSchema],
    required: true
  },
  tel: {
    type: String,
  },
  cel: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model("Company", CompanySchema);

export default Company;
