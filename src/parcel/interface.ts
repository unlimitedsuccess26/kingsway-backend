import  { Document } from "mongoose";

export interface IParcel extends Document {
  senderName: string;
  receiverName: string;
  email: string;
  receiverEmail: string;
  freightDate: string;
  arrivalDate: string;
  parcelWeight: string;
  parcelsDesignation: string;
  newLocation: string;
  orderId: string;
  status: string;
  createdAt: Date;
}


export interface IParcelUserInput {
    senderName: string;
    receiverName: string;
    email: string;
    receiverEmail: string;
    freightDate: string;
    arrivalDate: string;
    parcelWeight: string;
    parcelsDesignation: string;
    newLocation: string
}

export interface IParcelStatusUpdate {
  status: string;
}

export interface IParcelUpdateUserInput {
  senderName: string;
  receiverName: string;
  email: string;
  receiverEmail: string;
  freightDate: string;
  arrivalDate: string;
  currentLocation: string;
  lastLocation: string;
  couriersMessage: string;
  freightType: string;
  remainingDistanceInMiles: string;
  newLocation: string;
}
