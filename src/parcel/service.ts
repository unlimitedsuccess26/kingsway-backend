import { generateOrderId } from "../utils";
import Parcel from "./entity";
import { ParcelStatus } from "./enum";
import { IParcelUpdateUserInput, IParcelUserInput } from "./interface";

class ParcelService {
  public async createParcel(input: IParcelUserInput) {
    const {
      arrivalDate,
      email,
      freightDate,
      newLocation,
      parcelWeight,
      parcelsDesignation,
      receiverEmail,
      receiverName,
      senderName,
    } = input;

    const orderId = generateOrderId();

    //console.log(orderId);

    const status = ParcelStatus.Pending;

    const newParcel = new Parcel({
      arrivalDate,
      email,
      freightDate,
      newLocation,
      parcelWeight,
      parcelsDesignation,
      receiverEmail,
      receiverName,
      senderName,
      orderId,
      status,
    });

    await newParcel.save();

    return;
  }

  public async fetchParcel() {
    const parcels = await Parcel.find();

    return parcels;
  }

  public async deleteParcel(_id: string) {
    const parcel = await Parcel.findOneAndDelete({ _id });

    return parcel;
  }

  public async updateParcelStatus(_id: string, status: string) {
    const parcel = await Parcel.findOneAndUpdate(
      { _id }, // Query to find the parcel by ID
      { status }, // Update the 'status' field
      { new: true } // Return the updated document
    );

    return parcel;
  }

  public async updateParcel(input: IParcelUpdateUserInput, _id: string) {
    const {
      arrivalDate,
      couriersMessage,
      currentLocation,
      email,
      freightDate,
      freightType,
      lastLocation,
      newLocation,
      receiverEmail,
      receiverName,
      remainingDistanceInMiles,
      senderName,
    } = input;

    const parcel = await Parcel.findOneAndUpdate(
      { _id }, // Query to find the parcel by ID
      {
        ...input
      }, // Update the values
      { new: true } // Return the updated document
    );

    return parcel;
  }

  public async fetchParcelByParcleId(orderId: string) {
    const parcel = await Parcel.findOne({ orderId });

    return parcel;
  }
}

export const parcelService = new ParcelService();
