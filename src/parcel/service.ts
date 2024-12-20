import { generateOrderId } from "../utils";
import Parcel from "./entity";
import { ParcelStatus } from "./enum";
import { IParcelUserInput } from "./interface";

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
     senderName
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
        status
    });

    await newParcel.save();

    return;
  }

  public async fetchParcel() {
    const parcels = await Parcel.find();

    return parcels;
  }

  public async deleteParcel(_id: string) {
    const parcel = await Parcel.findOneAndDelete({_id});

    return parcel;
  }
}

export const parcelService = new ParcelService();
