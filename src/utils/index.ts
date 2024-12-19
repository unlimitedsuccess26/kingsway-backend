import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

// Middleware function to wrap controllers with try-catch
export const wrapAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const generateOtp = (): string  => {
  return Array.from({ length: 4 }, () => crypto.randomInt(0, 10)).join('');
}

export const generateOrderId = (): string  => {
  const prefix = "KY"; 
  const suffix = "US";

  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase(); // 3 bytes -> 6 hex characters

  const timestamp = Date.now().toString();

  return `${prefix}${timestamp}${randomPart}${suffix}`;
}