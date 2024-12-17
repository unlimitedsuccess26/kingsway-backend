"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
const validator_2 = require("../item/validator");
const is_auth_1 = require("../middleware/is_auth");
exports.JobRouter = (0, express_1.Router)();
//old
exports.JobRouter.post("/create-job", [is_auth_1.isAuth, validator_1.jobValidator.createJob], (0, utils_1.wrapAsync)(controller_1.jobController.createJob));
//new
exports.JobRouter.post("/job", [is_auth_1.isAuth, validator_1.jobValidator.createJob], (0, utils_1.wrapAsync)(controller_1.jobController.createJob));
//old
exports.JobRouter.get("/fetch-jobs", (0, utils_1.wrapAsync)(controller_1.jobController.fetchAllJobs));
//new
exports.JobRouter.get("/jobs", (0, utils_1.wrapAsync)(controller_1.jobController.fetchAllJobs));
//old
exports.JobRouter.get("/fetch-job-details/:id", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_2.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.jobController.fetchJobDetails));
//new
exports.JobRouter.get("/job/:id", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_2.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.jobController.fetchJobDetails));
exports.JobRouter.get("/job/by/slug/:slug", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_2.itemValidator.validateSlug], (0, utils_1.wrapAsync)(controller_1.jobController.fetchJobDetailsBySlug));
