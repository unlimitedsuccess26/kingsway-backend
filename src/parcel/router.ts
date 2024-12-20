import { Router } from "express";

import { createParcelController } from "./controller";
import { wrapAsync } from "../utils";
import { parcelValidator } from "./validator";
import { isAuth } from "../middleware/isAuth";

export const ParcelRouter = Router();

//create Parcel
ParcelRouter.post(
  "/create/parcel",
  [isAuth, parcelValidator.createParcel],
  wrapAsync(createParcelController.createParcel)
);

//fetch parcel
ParcelRouter.get(
  "/parcel",
  [isAuth],
  wrapAsync(createParcelController.fetchParcel)
);

//Delete a single parcel with _id
ParcelRouter.delete(
  "/parcel/:id",
  [isAuth, parcelValidator.validateParams],
  wrapAsync(createParcelController.deleteParcel)
);

//Update a single parcel status with _id
ParcelRouter.patch(
  "/parcel/:id",
  [isAuth, parcelValidator.validateParams, parcelValidator.updateParcelStatus],
  wrapAsync(createParcelController.updateParcelStaus)
);

//Update parcel details with _id
ParcelRouter.patch(
  "/update/parcel/:id",
  [isAuth, parcelValidator.validateParams, parcelValidator.updateParcel],
  wrapAsync(createParcelController.updateParcel)
);

//get parcel with parcel id
ParcelRouter.get(
  "/customer/parcel/:trackingId",
  [parcelValidator.validateOrderIdParams],
  wrapAsync(createParcelController.fetchParcelByParcelId)
);


