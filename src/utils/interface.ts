import { Request } from "express";
import { Socket} from "socket.io";
import { JwtPayload } from "jsonwebtoken";

export interface ISendEmail {
  receiverEmail: string;
  subject: string;
  emailTemplate: string;
}

export interface CustomRequest extends Request {
  userId: string;
}

export interface ExtendedSocket extends Socket {
  decoded?: JwtPayload | string;
}

export interface DecodedToken extends JwtPayload {
  userId: string;
}