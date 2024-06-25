import { VendorService } from "./vendor.service";
import { ConflictError } from "../utils";
import { MockBaseRepository } from "../../test/base.repository";
import { Product, Vendor } from "./entity";
import { Order } from "../utils/pagination";

class MockVendorRepo extends MockBaseRepository<Vendor> {
  async findByUserId(userId: string): Promise<Vendor> {
    return this.findOne({ where: { userId } }) as Promise<Vendor>;
  }
}

class MockProductRepo extends MockBaseRepository<Product> {}

describe("VendorService", () => {
  let vendorService: VendorService;
  let vendorRepo: MockVendorRepo;
  let productRepo: MockProductRepo;

  beforeEach(() => {
    vendorRepo = new MockVendorRepo();
    productRepo = new MockProductRepo();
    vendorService = new VendorService(vendorRepo, productRepo);
  });

  describe("onboarding", () => {
    it("should throw an error if the user has already onboarded as a vendor", async () => {
      vendorRepo.save({ userId: "user1" } as Vendor);

      await expect(
        vendorService.onboarding("user1", {
          name: "Vendor1",
          address: "Address1",
          contactEmail: "vendor1@example.com",
          phoneNumber: "1234567890",
        })
      ).rejects.toThrow(ConflictError);
    });

    it("should onboard a new vendor", async () => {
      const result = await vendorService.onboarding("user1", {
        name: "Vendor1",
        address: "Address1",
        contactEmail: "vendor1@example.com",
        phoneNumber: "1234567890",
      });

      expect(result).toEqual(
        expect.objectContaining({
          userId: "user1",
          name: "Vendor1",
          address: "Address1",
          contactEmail: "vendor1@example.com",
          phoneNumber: "1234567890",
        })
      );
    });
  });

  describe("addProduct", () => {
    it("should throw an error if the user has not onboarded as a vendor", async () => {
      await expect(
        vendorService.addProduct("user1", {
          name: "Product1",
          price: 100,
          description: "Description1",
          category: "Category1",
          stockQuantity: 10,
        })
      ).rejects.toThrow(ConflictError);
    });

    it("should add a product for an onboarded vendor", async () => {
      vendorRepo.save({ id: "vendor1", userId: "user1" } as Vendor);

      const result = await vendorService.addProduct("user1", {
        name: "Product1",
        price: 100,
        description: "Description1",
        category: "Category1",
        stockQuantity: 10,
      });

      expect(result).toEqual(
        expect.objectContaining({
          name: "Product1",
          price: 100,
          description: "Description1",
          category: "Category1",
          stockQuantity: 10,
        })
      );
    });
  });

  describe("getProducts", () => {
    it("should throw an error if the user has not onboarded as a vendor", async () => {
      await expect(
        vendorService.getProducts("user1", {
          page: 1,
          limit: 10,
          skip: 0,
          order: Order.ASC,
        })
      ).rejects.toThrow(ConflictError);
    });

    it("should return paginated products for an onboarded vendor", async () => {
      vendorRepo.save({ id: "vendor1", userId: "user1" } as unknown as Vendor);
      productRepo.save({
        name: "Product1",
        vendorId: "vendor1",
      } as unknown as Product);
      productRepo.save({
        name: "Product2",
        vendorId: "vendor1",
      } as unknown as Product);

      const result = await vendorService.getProducts("user1", {
        page: 1,
        skip: 0,
        limit: 10,
        order: Order.ASC,
      });

      expect(result.data.length).toBe(2);
      expect(result.meta.itemCount).toBe(2);
    });
  });

  describe("getProduct", () => {
    it("should throw an error if the user has not onboarded as a vendor", async () => {
      await expect(
        vendorService.getProduct("user1", "product1")
      ).rejects.toThrow(ConflictError);
    });

    it("should return the product details for an onboarded vendor", async () => {
      vendorRepo.save({ id: "vendor1", userId: "user1" } as Vendor);
      productRepo.save({ id: "product1", vendorId: "vendor1" } as Product);

      const result = await vendorService.getProduct("user1", "product1");

      expect(result).toEqual(
        expect.objectContaining({ id: expect.any(String) })
      );
    });
  });

  describe("updateProduct", () => {
    it("should throw an error if the user has not onboarded as a vendor", async () => {
      await expect(
        vendorService.updateProduct("user1", "product1", {
          name: "UpdatedProduct1",
          price: 150,
          description: "UpdatedDescription1",
          category: "UpdatedCategory1",
          stockQuantity: 15,
        })
      ).rejects.toThrow(ConflictError);
    });

    it("should update the product for an onboarded vendor", async () => {
      vendorRepo.save({ id: "vendor1", userId: "user1" } as Vendor);
      productRepo.save({ id: "product1", vendorId: "vendor1" } as Product);

      const result = await vendorService.updateProduct("user1", "product1", {
        name: "UpdatedProduct1",
        price: 150,
        description: "UpdatedDescription1",
        category: "UpdatedCategory1",
        stockQuantity: 15,
      });

      expect(result).toEqual(
        expect.objectContaining({
          affected: 1,
        })
      );
    });
  });

  describe("deleteProduct", () => {
    it("should throw an error if the user has not onboarded as a vendor", async () => {
      await expect(
        vendorService.deleteProduct("user1", "product1")
      ).rejects.toThrow(ConflictError);
    });

    it("should delete the product for an onboarded vendor", async () => {
      vendorRepo.save({ id: "vendor1", userId: "user1" } as Vendor);
      productRepo.save({ id: "product1", vendorId: "vendor1" } as Product);

      const result = await vendorService.deleteProduct("user1", "product1");

      expect(result).toEqual(
        expect.objectContaining({
          affected: 1,
        })
      );
    });
  });
});
