import express from "express";
import { VendorRepo } from "./repository";
import { handleAsyncError } from "../utils";
import { VendorService } from "./vendor.service";
import { VendorController } from "./vendor.controller";
import { authMiddleware } from "../middleware";

const vendorRouter = express.Router();

const vendorRepo = new VendorRepo();
const vendorService = new VendorService(vendorRepo);
const vendorController = new VendorController(vendorService);

vendorRouter.use(authMiddleware);

vendorRouter.post(
  "/onboard",
  handleAsyncError(vendorController.onboarding.bind(vendorController))
);

export { vendorRouter };
