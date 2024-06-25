import express from "express";
import { ProductRepo, VendorRepo } from "./repository";
import { handleAsyncError, validate, validateParamsIds } from "../../utils";
import { VendorService } from "./vendor.service";
import { VendorController } from "./vendor.controller";
import { authMiddleware, authorize } from "../../middleware";
import { onboardingValidation, productValidation } from "./vendor.validation";
import { UserRoleEnum } from "../../interfaces";

const vendorRouter = express.Router();

const vendorRepo = new VendorRepo();
const productRepo = new ProductRepo();
const vendorService = new VendorService(vendorRepo, productRepo);
const vendorController = new VendorController(vendorService);

vendorRouter.use(authMiddleware);

vendorRouter.use(authorize(UserRoleEnum.VENDOR));

vendorRouter.post(
  "/onboard",
  validate(onboardingValidation),
  handleAsyncError(vendorController.onboarding.bind(vendorController))
);

vendorRouter.post(
  "/products",
  validate(productValidation),
  handleAsyncError(vendorController.addProduct.bind(vendorController))
);

vendorRouter.get(
  "/products",
  handleAsyncError(vendorController.getProducts.bind(vendorController))
);

vendorRouter.get(
  "/products/:id",
  validateParamsIds(["id"]),
  handleAsyncError(vendorController.getProduct.bind(vendorController))
);

vendorRouter.put(
  "/products/:id",
  validateParamsIds(["id"]),
  validate(productValidation),
  handleAsyncError(vendorController.updateProduct.bind(vendorController))
);

vendorRouter.delete(
  "/products/:id",
  validateParamsIds(["id"]),
  handleAsyncError(vendorController.deleteProduct.bind(vendorController))
);

export { vendorRouter };
