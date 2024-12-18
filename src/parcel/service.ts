import Parcel from "./entity";
import { IParcelUserInput } from "./interface";

class CreateParcelService {
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

    const newParcel = new Parcel({
        arrivalDate,
        email,
        freightDate, 
        newLocation,
        parcelWeight,
        parcelsDesignation,
        receiverEmail,
        receiverName,
        senderName
    });

    await newParcel.save();

    return;
  }
}

export const createParcelService = new CreateParcelService();
