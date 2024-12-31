import { Document } from "mongoose";

export interface IParcel extends Document {
  senderName: string;
  receiverName: string;
  email: string;
  receiverEmail: string;
  freightDate: string;
  arrivalDate: string;
  parcelWeight: string;
  parcelsDesignation: string;
  senderLocation: string;
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
  senderLocation: string;
  phoneNumber: string;

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
  remainingDistanceInMiles: string;
  senderLocation: string;
}

export interface IParcelSendEmail {
  receiverName: string;
  receiverEmail: string;
  senderEmail: string;
  trackingId: string;
  phoneNumber: string;
  parcelsDesignation: string;
  senderLocation: string;
  isSender: boolean;
}
