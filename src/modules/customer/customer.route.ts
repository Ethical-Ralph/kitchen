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

const customerService = new CustomerService(vendorRepo, productRepo);
const customerController = new CustomerController(customerService);

customerRouter.use(authMiddleware);

customerRouter.use(authorize(UserRoleEnum.CUSTOMER));

customerRouter.get(
  "/products",
  handleAsyncError(customerController.getProducts.bind(customerController))
);

customerRouter.get(
  "/vendors",
  handleAsyncError(customerController.getVendors.bind(customerController))
);

customerRouter.get(
  "/vendors/:id",
  validateParamsIds(["id"]),
  handleAsyncError(customerController.getVendor.bind(customerController))
);

customerRouter.get(
  "/vendors/:id/products",
  validateParamsIds(["id"]),
  handleAsyncError(
    customerController.getVendorProducts.bind(customerController)
  )
);

customerRouter.get(
  "/vendors/:vendorId/products/:productId",
  validateParamsIds(["vendorId", "productId"]),
  handleAsyncError(customerController.getVendorProduct.bind(customerController))
);

export { customerRouter };
