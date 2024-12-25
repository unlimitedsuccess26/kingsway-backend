import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import {  IReachOutUserInput } from "./interface";
import { sendReachOutEmailToAdmin } from "../utils/email";

class ReachOutController {
  public async sendReachOutMessage(req: Request, res: Response) {
    const body: IReachOutUserInput = req.body;

    sendReachOutEmailToAdmin(body);

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Sent!",
      data: null,
    });
  }
}

export const reachOutController = new ReachOutController();
