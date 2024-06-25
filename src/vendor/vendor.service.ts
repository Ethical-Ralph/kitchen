import { ConflictError } from "../utils";
import { PaginationDto, PaginationResultDto } from "../utils/pagination";
import { ProductRepo, VendorRepo } from "./repository";

export class VendorService {
  constructor(
    private vendorRepo: VendorRepo,
    private productRepo: ProductRepo
  ) {}

  async onboarding(
    userId: string,
    data: {
      name: string;
      address: string;
      contactEmail: string;
      phoneNumber: string;
    }
  ) {
    const vendorExist = await this.vendorRepo.findByUserId(userId);

    if (vendorExist) {
      throw new ConflictError("You have already onboarded as a vendor");
    }

    return this.vendorRepo.save({ ...data, userId });
  }

  async addProduct(
    userId: string,
    data: {
      name: string;
      price: number;
      description: string;
      category: string;
      stockQuantity: number;
    }
  ) {
    const vendor = await this.vendorRepo.findByUserId(userId);

    if (!vendor) {
      throw new ConflictError("You have not onboarded as a vendor");
    }

    return this.productRepo.save({ ...data, vendorId: vendor.id! });
  }

  async getProducts(userId: string, query: PaginationDto) {
    const vendor = await this.vendorRepo.findByUserId(userId);

    if (!vendor) {
      throw new ConflictError("You have not onboarded as a vendor");
    }

    const [data, count] = await this.productRepo.findAndCount({
      where: { vendorId: vendor.id },
      skip: query.skip,
      take: query.limit,
    });

    return new PaginationResultDto(data, {
      itemCount: count,
      pageOptionsDto: query,
    });
  }

  async getProduct(userId: string, productId: string) {
    const vendor = await this.vendorRepo.findByUserId(userId);

    if (!vendor) {
      throw new ConflictError("You have not onboarded as a vendor");
    }

    return this.productRepo.findOne({
      where: { vendorId: vendor.id, id: productId },
    });
  }

  async updateProduct(
    userId: string,
    productId: string,
    data: {
      name: string;
      price: number;
      description: string;
      category: string;
      stockQuantity: number;
    }
  ) {
    const vendor = await this.vendorRepo.findByUserId(userId);

    if (!vendor) {
      throw new ConflictError("You have not onboarded as a vendor");
    }

    return this.productRepo.update(
      { id: productId, vendorId: vendor.id },
      data
    );
  }

  async deleteProduct(userId: string, productId: string) {
    const vendor = await this.vendorRepo.findByUserId(userId);

    if (!vendor) {
      throw new ConflictError("You have not onboarded as a vendor");
    }

    return this.productRepo.delete({ id: productId, vendorId: vendor.id });
  }
}
