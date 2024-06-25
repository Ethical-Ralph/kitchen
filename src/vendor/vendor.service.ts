import { ConflictError } from "../utils";
import { VendorRepo } from "./repository";

export class VendorService {
  constructor(private vendorRepo: VendorRepo) {}

  async onboarding(data: {
    name: string;
    address: string;
    contactEmail: string;
    phoneNumber: string;
    userId: string;
  }) {
    const vendorExist = await this.vendorRepo.findByUserId(data.userId);

    if (vendorExist) {
      throw new ConflictError("You have already onboarded as a vendor");
    }

    return this.vendorRepo.save(data);
  }
}
