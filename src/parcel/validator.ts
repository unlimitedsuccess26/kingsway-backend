import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import { MessageResponse } from "../utils/enum";

class CreateParcelValidator {
  public async createParcel(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
     senderName: Joi.string().required().messages({
        "string.base": "Sender name must be text",
        "any.required": "Sender name is required.",
      }),
      receiverName: Joi.string().required().messages({
        "string.base": "Receiver name must be text",
        "any.required": "Receiver name is required.",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email address is required",
      }),
      receiverEmail: Joi.string().email().required().messages({
        "string.email": "Please enter a valid receiver email address",
        "any.required":" Receiver email address is required",
      }),
      freightDate: Joi.string().required().messages({
        "string.base": "Freight date must be text",
        "any.required": "Freight date is required.",
      }),
      arrivalDate: Joi.string().required().messages({
        "string.base": "Arrival date must be text",
        "any.required": "Arrival date is required.",
      }), 
      parcelWeight: Joi.string().required().messages({
        "string.base": "Parcel weight must be text",
        "any.required": "Parcel weight is required.",
      }), 
      parcelsDesignation: Joi.string().required().messages({
        "string.base": "Parcel designation must be text",
        "any.required": "Parcel designation is required.",
      }),
      newLocation: Joi.string()
        .pattern(
          /^https:\/\/www\.google\.com\/maps\/embed\/v1\/place\?key=[A-Za-z0-9_-]+&q=[^&]+(&zoom=\d+)?(&maptype=[a-z]+)?$/i
        )
        .required()
        .messages({
          "string.pattern.base": "New location must be a valid Google Maps embed URL.",
          "any.required": "New location is required.",
        }),
    });
    const { error } = schema.validate(req.body);

    if (!error) {
      return next();
    } else {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: error.details[0].message,
        data: null,
      });
    }
  }
}

export const createParcelValidator = new CreateParcelValidator();
