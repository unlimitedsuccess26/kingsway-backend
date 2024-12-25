import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import { MessageResponse } from "../utils/enum";

class ReachOutValidator {
  public async reachOut(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
     name: Joi.string().required().messages({
        "string.base": "Name must be text",
        "any.required": "Name is required.",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email address is required",
      }),
      departmentToEmail: Joi.string().required().messages({
        "string.base": "Department must be text",
        "any.required": "Department is required.",
      }),
      description: Joi.string().required().messages({
        "string.base": "Description must be text",
        "any.required": "Description is required.",
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

export const reachOutValidator = new ReachOutValidator();
