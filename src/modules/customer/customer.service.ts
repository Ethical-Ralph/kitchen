import { NotFoundError } from "../../utils";
import { PaginationResultDto, PaginationDto } from "../../utils/pagination";
import { ProductRepo, VendorRepo } from "../vendor/repository";

export class CustomerService {
  constructor(
    private vendorRepo: VendorRepo,
    private productRepo: ProductRepo
  ) {}

  async getVendors(query: PaginationDto) {
    const [data, count] = await this.vendorRepo.findAndCount({
      skip: query.skip,
      take: query.limit,
      order: { createdAt: query.order },
    });

    return new PaginationResultDto(data, {
      itemCount: count,
      pageOptionsDto: query,
    });
  }

  async getVendor(vendorId: string) {
    const vendor = await this.vendorRepo.findById(vendorId);

    if (!vendor) {
      throw new NotFoundError("Vendor not found");
    }

    return vendor;
  }

  async getVendorProducts(vendorId: string, query: PaginationDto) {
    const vendor = await this.vendorRepo.findById(vendorId);

    if (!vendor) {
      throw new NotFoundError("Vendor not found");
    }

    const [data, count] = await this.productRepo.findAndCount({
      where: { vendorId },
      order: { createdAt: query.order },
      skip: query.skip,
      take: query.limit,
    });

    return new PaginationResultDto(data, {
      itemCount: count,
      pageOptionsDto: query,
    });
  }

  async getVendorProduct(vendorId: string, productId: string) {
    const vendor = await this.vendorRepo.findById(vendorId);

    if (!vendor) {
      throw new NotFoundError("Vendor not found");
    }

    const product = await this.productRepo.findOne({
      where: { vendorId, id: productId },
      relations: { vendor: true },
    });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return product;
  }
}
