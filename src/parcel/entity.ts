import mongoose from "mongoose";

import { IParcel } from "./interface";
import { ParcelStatus } from "./enum";

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
  phoneNumber: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    default: "",
  },
  lastLocation: {
    type: String,
    default: "",
  },
  senderLocation: {
    type: String,
    required: true,
  },
  couriersMessage: {
    type: String,
    default: "",
  },
  freightType: {
    type: String,
    default: "",
  },
  remainingDistanceInMiles: {
    type: String,
    default: "",
  },
  parcelsDesignation: {
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
    enum: [ParcelStatus.Completed, ParcelStatus.Ongoing, ParcelStatus.Pending],
  },
  createdAt: { type: Date, default: Date.now },
});

const Parcel = mongoose.model<IParcel>("Parcel", parcelSchema);

export default Parcel;
