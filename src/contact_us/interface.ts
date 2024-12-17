import  { Document } from "mongoose";

export interface IContactUs extends Document {
  name: string;
  email: string;
  issueType: string;
  description: string;
}

export interface IContactUsUserInput {
  name: string;
  email: string;
  issueType: string;
  description: string;
}
