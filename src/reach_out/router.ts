import { Router } from "express";

import { wrapAsync } from "../utils";
import { reachOutValidator } from "./validator";
import { reachOutController } from "./controller";

export const ReachOutRouter = Router();

//contact us form inpput
ReachOutRouter.post(
  "/reach/out",
  [reachOutValidator.reachOut],
  wrapAsync(reachOutController.sendReachOutMessage)
);

