import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import { IParcelUserInput } from "./interface";
import { parcelService } from "./service";

class CreateParcelController {
  public async createParcel(req: Request, res: Response) {
    const body: IParcelUserInput  = req.body;

    await parcelService.createParcel(body);

    return res.status(201).json({
      message: MessageResponse.Success,
      description: "Parcel created successfully!",
      data: null,
    });
  }

  public async fetchParcel(req: Request, res: Response) {

   const parcels = await parcelService.fetchParcel();

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Parcel fetched successfully!",
      data: parcels,
    });
  }

  public async deleteParcel(req: Request, res: Response) {
    const { id } = req.params;

    const parcel = await parcelService.deleteParcel(id);

    if (!parcel) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "Could not find parcel!",
        data: null,
      });
    }


    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Parcel deleted successfully!",
      data: null,
    });
  }
}

export const createParcelController = new CreateParcelController();
