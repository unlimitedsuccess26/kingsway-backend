import  { Document } from "mongoose";

export interface IReachOut extends Document {
  name: string;
  email: string;
  departmentToEmail: string;
  description: string;
  createdAt: Date;
}

export interface IReachOutUserInput {
  name: string;
  email: string;
  departmentToEmail: string;
  description: string;
}
