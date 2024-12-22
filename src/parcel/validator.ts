import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { MessageResponse } from "../utils/enum";
import { ParcelStatus } from "./enum";

class ParcelValidator {
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
      newLocation: Joi.string().required().messages({
        "string.base": "New location must be text",
        "any.required": "New location is required.",
      }),
      phoneNumber: Joi.string().required().messages({
        "string.base": "Phone number must be text",
        "any.required": "Phone number is required.",
      }),
      address: Joi.string().required().messages({
        "string.base": "Address must be text",
        "any.required": "Address is required.",
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

  public validateParams(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      id: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message({
            custom: "ID must be a valid ObjectId",
          });
        }
        return value;
      }).required().messages({
        'string.base': 'ID must be a string',
        'any.required': 'ID is required',
      }),
    });

    const { error } = schema.validate(req.params);

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

  public validateOrderIdParams(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      trackingId: Joi.string().required().messages({
        "string.base": "TrackingId must be text",
        "any.required": "TrackingId is required.",
      }),
    });

    const { error } = schema.validate(req.params);

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

  public async updateParcelStatus(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      status: Joi.string()
        .valid(ParcelStatus.Pending, ParcelStatus.Completed, ParcelStatus.Ongoing)
        .required()
        .messages({
          "any.only": `Status must be either ${ParcelStatus.Pending}, ${ParcelStatus.Completed} or ${ParcelStatus.Ongoing}.`,
          "any.required": "Status is required.",
          "string.base": "Status must be a text string.",
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
  
  public async updateParcel(req: Request, res: Response, next: NextFunction) {
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
      currentLocation: Joi.string().required().messages({
        "string.base": "Current location must be text",
        "any.required": "Current location is required.",
      }), 
      lastLocation: Joi.string().required().messages({
        "string.base": "Last location must be text",
        "any.required": "Last location is required.",
      }),
      newLocation: Joi.string()
      .pattern(
        /^https:\/\/www\.google\.com\/maps\/embed\/v1\/place\?key=[A-Za-z0-9_-]+&q=[^&]+(&zoom=\d+)?(&maptype=[a-z]+)?$/i
      )
      .required()
      .messages({
        "string.pattern.base": "New location must be a valid Google Maps embed URL.",
        "any.required": "New location is required.",
      }) ,
      couriersMessage: Joi.string().required().messages({
        "string.base": "Couriers message must be text",
        "any.required": "Couriers message required.",
      }),
      freightType: Joi.string().required().messages({
        "string.base": "Freight type message must be text",
        "any.required": "Freight type message required.",
      }),
      remainingDistanceInMiles: Joi.string().required().messages({
        "string.base": "Remaining distance in miles message must be text",
        "any.required": "Remaining distance in miles message required.",
      }),
      phoneNumber: Joi.string().required().messages({
        "string.base": "Phone number must be text",
        "any.required": "Phone number is required.",
      }),
      address: Joi.string().required().messages({
        "string.base": "Address must be text",
        "any.required": "Address is required.",
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

export const parcelValidator = new ParcelValidator();
