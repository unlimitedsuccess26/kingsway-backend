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
