import express from "express";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { ProductRepo, VendorRepo } from "../vendor/repository";
import { authMiddleware, authorize } from "../../middleware";
import { handleAsyncError, validateParamsIds } from "../../utils";
import { UserRoleEnum } from "../../interfaces";

const customerRouter = express.Router();

const vendorRepo = new VendorRepo();
const productRepo = new ProductRepo();

const vendorService = new CustomerService(vendorRepo, productRepo);
const vendorController = new CustomerController(vendorService);

customerRouter.use(authMiddleware);

customerRouter.use(authorize(UserRoleEnum.CUSTOMER));

customerRouter.get(
  "/vendors",
  handleAsyncError(vendorController.getVendors.bind(vendorController))
);

customerRouter.get(
  "/vendors/:id",
  validateParamsIds(["id"]),
  handleAsyncError(vendorController.getVendor.bind(vendorController))
);

customerRouter.get(
  "/vendors/:id/products",
  validateParamsIds(["id"]),
  handleAsyncError(vendorController.getVendorProducts.bind(vendorController))
);

customerRouter.get(
  "/vendors/:vendorId/products/:productId",
  validateParamsIds(["vendorId", "productId"]),
  handleAsyncError(vendorController.getVendorProduct.bind(vendorController))
);

export { customerRouter };
