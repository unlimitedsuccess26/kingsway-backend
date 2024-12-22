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
  phoneNumber: string;
    address: string;
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
    newLocation: string;
    phoneNumber: string;
    address: string;
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
  phoneNumber: string;
  address: string;
  remainingDistanceInMiles: string;
  newLocation: string;
}

export interface IParcelSendEmail {
  receiverName: string;
  receiverEmail: string;
  trackingId: string;
  phoneNumber: string;
  address: string;
}
