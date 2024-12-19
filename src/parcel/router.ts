import { Router } from "express";

import { createParcelController } from "./controller";
import { wrapAsync } from "../utils";
import { createParcelValidator } from "./validator";
import { isAuth } from "../middleware/isAuth";

export const ParcelRouter = Router();

//create Parcel
ParcelRouter.post(
  "/create/parcel",
  [isAuth, createParcelValidator.createParcel],
  wrapAsync(createParcelController.createParcel)
);

ParcelRouter.get(
  "/parcel",
  //[isAuth],
  wrapAsync(createParcelController.fetchParcel)
);

