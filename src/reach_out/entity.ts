import mongoose from "mongoose";

import { IReachOut } from "./interface";

const Schema = mongoose.Schema;

const reachOutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  departmentToEmail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const ReachOut = mongoose.model<IReachOut>("ReachOut", reachOutSchema);

export default ReachOut;
