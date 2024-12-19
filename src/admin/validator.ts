import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import { MessageResponse } from "../utils/enum";

class AdminValidator {
  public async adminLogin(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
     userName: Joi.string().required().messages({
        "string.base": "User name must be text",
        "any.required": "User name is required.",
      }),
     password: Joi.string().required().messages({
        "string.base": "Password must be text",
        "any.required": "Password is required.",
      })
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

export const adminValidator = new AdminValidator();
