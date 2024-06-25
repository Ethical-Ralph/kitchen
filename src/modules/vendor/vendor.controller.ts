import { Request, Response } from "express";
import { VendorService } from "./vendor.service";
import { PaginationDto } from "../../utils/pagination";

export class VendorController {
  constructor(private vendorService: VendorService) {}

  async onboarding(req: Request, res: Response) {
    const { body } = req;
    const { id: userId } = req.user;

    const user = await this.vendorService.onboarding(userId, body);

    res.json(user);
  }

  async addProduct(req: Request, res: Response) {
    const { body } = req;
    const { id: userId } = req.user;

    const product = await this.vendorService.addProduct(userId, body);

    res.json(product);
  }

  async getProducts(req: Request, res: Response) {
    const { query } = req;
    const { id: userId } = req.user;

    const q = Object.assign(new PaginationDto(), {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    });

    const products = await this.vendorService.getProducts(userId, q);

    res.json(products);
  }

  async getProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user;

    const product = await this.vendorService.getProduct(userId, id);

    res.json(product);
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const { id: userId } = req.user;

    await this.vendorService.updateProduct(userId, id, body);

    res.json({ message: "Product updated" });
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user;

    await this.vendorService.deleteProduct(userId, id);

    res.json({ message: "Product deleted" });
  }
}
