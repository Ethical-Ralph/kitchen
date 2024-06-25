import express from "express";
import { ProductRepo, VendorRepo } from "./repository";
import { handleAsyncError } from "../utils";
import { VendorService } from "./vendor.service";
import { VendorController } from "./vendor.controller";
import { authMiddleware } from "../middleware";

const vendorRouter = express.Router();

const vendorRepo = new VendorRepo();
const productRepo = new ProductRepo();
const vendorService = new VendorService(vendorRepo, productRepo);
const vendorController = new VendorController(vendorService);

vendorRouter.use(authMiddleware);

vendorRouter.post(
  "/onboard",
  handleAsyncError(vendorController.onboarding.bind(vendorController))
);

vendorRouter.post(
  "/products",
  handleAsyncError(vendorController.addProduct.bind(vendorController))
);

vendorRouter.get(
  "/products",
  handleAsyncError(vendorController.getProducts.bind(vendorController))
);

vendorRouter.get(
  "/products/:id",
  handleAsyncError(vendorController.getProduct.bind(vendorController))
);

vendorRouter.put(
  "/products/:id",
  handleAsyncError(vendorController.updateProduct.bind(vendorController))
);

vendorRouter.delete(
  "/products/:id",
  handleAsyncError(vendorController.deleteProduct.bind(vendorController))
);

export { vendorRouter };
