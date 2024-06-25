import express from "express";
import { CustomerController } from "./customer.controller";
import { authMiddleware } from "../middleware";
import { CustomerService } from "./customer.service";
import { ProductRepo, VendorRepo } from "../vendor/repository";

const customerRouter = express.Router();

const vendorRepo = new VendorRepo();
const productRepo = new ProductRepo();

const vendorService = new CustomerService(vendorRepo, productRepo);
const vendorController = new CustomerController(vendorService);

customerRouter.use(authMiddleware);

customerRouter.get(
  "/vendors",
  vendorController.getVendors.bind(vendorController)
);

customerRouter.get(
  "/vendors/:id",
  vendorController.getVendor.bind(vendorController)
);

customerRouter.get(
  "/vendors/:id/products",
  vendorController.getVendorProducts.bind(vendorController)
);

customerRouter.get(
  "/vendors/:vendorId/products/:productId",
  vendorController.getVendorProduct.bind(vendorController)
);

export { customerRouter };
