import { MockBaseRepository } from "../../../test/base.repository";
import { NotFoundError } from "../../utils";
import { Order } from "../../utils/pagination";
import { Product, Vendor } from "../vendor/entity";
import { CustomerService } from "./customer.service";

class MockVendorRepo extends MockBaseRepository<Vendor> {
  async findByUserId(userId: string): Promise<Vendor> {
    return this.findOne({ where: { userId } }) as Promise<Vendor>;
  }
}
class MockProductRepo extends MockBaseRepository<Product> {}

describe("CustomerService", () => {
  let customerService: CustomerService;
  let vendorRepo: MockVendorRepo;
  let productRepo: MockProductRepo;

  beforeEach(() => {
    vendorRepo = new MockVendorRepo();
    productRepo = new MockProductRepo();
    customerService = new CustomerService(vendorRepo, productRepo);
  });

  describe("getVendors", () => {
    it("should return paginated vendors", async () => {
      vendorRepo.save({ name: "Vendor1" } as Vendor);
      vendorRepo.save({ name: "Vendor2" } as Vendor);

      const result = await customerService.getVendors({
        page: 1,
        skip: 0,
        limit: 10,
        order: Order.ASC,
      });

      expect(result.data.length).toBe(2);
      expect(result.meta.itemCount).toBe(2);
    });
  });

  describe("getVendor", () => {
    it("should throw an error if vendor is not found", async () => {
      await expect(customerService.getVendor("1")).rejects.toThrow(
        NotFoundError
      );
    });

    it("should return the vendor details if vendor is found", async () => {
      const vendor = { id: "1", name: "Vendor1" } as Vendor;
      await vendorRepo.save(vendor);

      const result = await customerService.getVendor("vendor1");

      expect(result).toEqual(vendor);
    });
  });

  describe("getVendorProducts", () => {
    it("should throw an error if vendor is not found", async () => {
      await expect(
        customerService.getVendorProducts("vendor1", {
          skip: 0,
          page: 1,
          limit: 10,
          order: Order.ASC,
        })
      ).rejects.toThrow(NotFoundError);
    });

    it("should return paginated products for a vendor", async () => {
      const vendor = { name: "Vendor1" } as Vendor;
      await vendorRepo.save(vendor);

      await productRepo.save({
        vendorId: "1",
        name: "Product1",
      } as Product);
      await productRepo.save({
        vendorId: "1",
        name: "Product2",
      } as Product);

      const result = await customerService.getVendorProducts("vendor1", {
        skip: 0,
        page: 1,
        limit: 10,
        order: Order.ASC,
      });

      expect(result.data.length).toBe(2);
      expect(result.meta.itemCount).toBe(2);
    });
  });

  describe("getVendorProduct", () => {
    it("should throw an error if vendor is not found", async () => {
      await expect(
        customerService.getVendorProduct("vendor1", "product1")
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw an error if product is not found", async () => {
      const vendor = { name: "Vendor1" } as Vendor;
      await vendorRepo.save(vendor);

      await expect(
        customerService.getVendorProduct("vendor1", "product1")
      ).rejects.toThrow(NotFoundError);
    });

    it("should return the product details if product is found", async () => {
      const vendor = { name: "Vendor1" } as Vendor;
      await vendorRepo.save(vendor);
      const product = {
        id: "1",
        vendorId: "1",
        name: "Product1",
      } as Product;
      await productRepo.save(product);

      const result = await customerService.getVendorProduct("1", "1");

      expect(result).toEqual(product);
    });
  });
});
