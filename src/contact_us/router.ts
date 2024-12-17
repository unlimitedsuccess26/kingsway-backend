import { Router } from "express";

import { contactUsController } from "./controller";
import { wrapAsync } from "../utils";
import { contactUsValidator } from "./validator";

export const ContactUsRouter = Router();

//contact us form inpput
ContactUsRouter.post(
  "/contact/us",
  [ contactUsValidator.contactUs],
  wrapAsync(contactUsController.sendContactUsMessage)
);

