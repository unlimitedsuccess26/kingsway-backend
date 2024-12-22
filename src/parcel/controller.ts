import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import {
  IParcelSendEmail,
  IParcelStatusUpdate,
  IParcelUpdateUserInput,
  IParcelUserInput,
} from "./interface";
import { parcelService } from "./service";
import { sendMessageToParcelReceiver } from "../utils/email";

class CreateParcelController {
  public async createParcel(req: Request, res: Response) {
    const body: IParcelUserInput = req.body;

    const parcel = await parcelService.createParcel(body);

    const value: IParcelSendEmail = {
      address: parcel.address,
      receiverEmail: parcel.receiverEmail,
      receiverName: parcel.receiverName,
      phoneNumber: parcel.phoneNumber,
      trackingId: parcel.orderId,
    };

    sendMessageToParcelReceiver(value);


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

  public async updateParcelStaus(req: Request, res: Response) {
    const { id } = req.params;

    const body: IParcelStatusUpdate = req.body;

    const status = body.status;

    const parcel = await parcelService.updateParcelStatus(id, status);

    if (!parcel) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "Could not find parcel!",
        data: null,
      });
    }

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Parcel status updated successfully!",
      data: parcel,
    });
  }

  public async updateParcel(req: Request, res: Response) {
    const { id } = req.params;

    const body: IParcelUpdateUserInput = req.body;

    const parcel = await parcelService.updateParcel(body, id);

    if (!parcel) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "Could not find parcel!",
        data: null,
      });
    }

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Parcel updated successfully!",
      data: parcel,
    });
  }

  public async fetchParcelByParcelId(req: Request, res: Response) {
    const { trackingId } = req.params;

    const parcel = await parcelService.fetchParcelByParcleId(trackingId);

    if (!parcel) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "Could not find parcel!",
        data: null,
      });
    }

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Parcel fetched successfully!",
      data: parcel,
    });
  }
}

export const createParcelController = new CreateParcelController();
