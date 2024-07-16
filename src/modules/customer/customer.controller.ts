import { Request, Response } from "express";
import { CustomerService } from "./customer.service";
import { PaginationDto } from "../../utils/pagination";

export class CustomerController {
  constructor(private customerService: CustomerService) {}

  async getVendors(req: Request, res: Response) {
    const { query } = req;

    const q = Object.assign(new PaginationDto(), {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    });

    const vendors = await this.customerService.getVendors(q);

    res.json(vendors);
  }

  async getVendor(req: Request, res: Response) {
    const { id } = req.params;

    const vendor = await this.customerService.getVendor(id);

    res.json(vendor);
  }

  async getVendorProducts(req: Request, res: Response) {
    const { query } = req;
    const { id } = req.params;

    const q = Object.assign(new PaginationDto(), {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    });

    const products = await this.customerService.getVendorProducts(id, q);

    res.json(products);
  }

  async getVendorProduct(req: Request, res: Response) {
    const { vendorId, productId } = req.params;

    const product = await this.customerService.getVendorProduct(
      vendorId,
      productId
    );

    res.json(product);
  }

  async getProducts(req: Request, res: Response) {
    const { vendorId } = req.query as { vendorId: string };

    const q = Object.assign(new PaginationDto(), req.query);

    const products = await this.customerService.getProducts({
      vendorId,
      query: q,
    });

    return res.json(products);
  }
}
