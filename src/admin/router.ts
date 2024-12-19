import { Router } from "express";

import { wrapAsync } from "../utils";
import { adminValidator } from "./validator";
import { adminController } from "./controller";

export const AdminRouter = Router();

//Sign in as admin
AdminRouter.post(
  "/admin/signin",
  [ adminValidator.adminLogin ],
  wrapAsync(adminController.adminSignIn)
);

//Create an admin
// AdminRouter.post(
//     "/admin/signup",
//     // [
//       // upload.none(),  // For FormData
//       // adminValidator.signUp],
//     wrapAsync(adminController.adminSignUp)
//   );

