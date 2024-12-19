import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { MessageResponse } from "../utils/enum";


import { IAdminUserInput } from "./interface";
import { adminService } from "./service";


dotenv.config();

const tokenExpiry = process.env.TOKEN_EXPIRY || "";
const jwtSecret = process.env.JWT_SECRET || "";

class AdminController {
    public async adminSignUp(req: Request, res: Response) {
        const body: IAdminUserInput = req.body;
    
        await adminService.createAdmin(body);
    
        return res.status(201).json({
          message: MessageResponse.Success,
          description: "Admin created succussfully!",
          data: null,
        });
      }

  public async adminSignIn(req: Request, res: Response) {
    const body:IAdminUserInput = req.body;

    const userName = body.userName;
    const password = body.password;

    const userExist = await adminService.findAdminByUserNameAndPassword({userName, password});

    if (!userExist) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Wrong user credentials!",
        data: null,
      });
    }

    const token = jwt.sign(
      { userId: userExist._id },
      jwtSecret,
      {
        expiresIn: tokenExpiry,
      }
    );

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Logged in successfully",
      data: {
        token,
      },
    });
}
}

export const adminController = new AdminController();
