import { PaginationDto, PaginationResultDto } from "../utils/pagination";
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
    return this.vendorRepo.findById(vendorId);
  }

  async getVendorProducts(vendorId: string, query: PaginationDto) {
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
    return this.productRepo.findOne({
      where: { vendorId, id: productId },
      relations: { vendor: true },
    });
  }
}
