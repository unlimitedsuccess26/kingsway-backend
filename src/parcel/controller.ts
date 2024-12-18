import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import { IParcelUserInput } from "./interface";
import { createParcelService } from "./service";

class CreateParcelController {
  public async createParcel(req: Request, res: Response) {
    const body: IParcelUserInput  = req.body;

    await createParcelService.createParcel(body);

    return res.status(201).json({
      message: MessageResponse.Success,
      description: "Parcel created successfully!",
      data: null,
    });
  }
}

export const createParcelController = new CreateParcelController();
