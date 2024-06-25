import { Request, Response } from "express";
import { VendorService } from "./vendor.service";

export class VendorController {
  constructor(private vendorService: VendorService) {}

  async onboarding(req: Request, res: Response) {
    const data = req.body;

    const user = await this.vendorService.onboarding({
      ...data,
      userId: req.user.id,
    });

    res.json(user);
  }
}
