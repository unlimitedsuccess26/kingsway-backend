import mongoose from "mongoose";

import {  IParcel } from "./interface";

const Schema = mongoose.Schema;

const parcelSchema = new Schema({
  senderName: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
  freightDate: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: String,
    required: true,
  },
  parcelWeight: {
    type: String,
    required: true,
  },
  parcelsDesignation: {
    type: String,
    required: true,
  },
  newLocation: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Parcel = mongoose.model<IParcel>("Parcel", parcelSchema);

export default Parcel;
