import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import { IContactUsUserInput } from "./interface";
import { sendContactUsEmailToAdmin } from "../utils/email";

class ContactUsController {
  public async sendContactUsMessage(req: Request, res: Response) {
    const body: IContactUsUserInput = req.body;

    sendContactUsEmailToAdmin(body);

    return res.status(201).json({
      message: MessageResponse.Success,
      description: "Sent!",
      data: null,
    });
  }
}

export const contactUsController = new ContactUsController();
