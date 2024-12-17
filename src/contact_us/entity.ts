import mongoose from "mongoose";

import { IContactUs } from "./interface";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model<IContactUs>("ContactUs", itemSchema);

export default Item;
