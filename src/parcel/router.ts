import { Router } from "express";

import { createParcelController } from "./controller";
import { wrapAsync } from "../utils";
import { createParcelValidator } from "./validator";

export const ParcelRouter = Router();

//create Parcel
ParcelRouter.post(
  "/create/parcel",
  [ createParcelValidator.createParcel],
  wrapAsync(createParcelController.createParcel)
);

