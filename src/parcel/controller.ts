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
}

export const createParcelController = new CreateParcelController();
