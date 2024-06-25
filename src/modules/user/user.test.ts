import { UserService } from "./user.service";
import { BaseEntity } from "../../database";
import { MockBaseRepository } from "../../../test/base.repository";
import { User } from "./entity";
import { BadRequestError, NotFoundError } from "../../utils";
import { UserRoleEnum } from "../../interfaces";

class MockUser extends BaseEntity {
  id = "1";
  email = "test@example.com";
  password = "$2b$10$GIB738JIQRz5Z2Kau3BF3eUwxtWTPnz/1wRSnIxUVsk.vx04VKAiC";
  fullName = "Test User";
  role = UserRoleEnum.CUSTOMER;
}

class MockUserRepo extends MockBaseRepository<User> {
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email: email.toLowerCase() } });
  }
}

describe("UserService", () => {
  let userService: UserService;
  let userRepo: MockUserRepo;

  beforeEach(() => {
    userRepo = new MockUserRepo();
    // dependency injection
    userService = new UserService(userRepo);
  });

  describe("registerUser", () => {
    it("should throw an error if email already exists", async () => {
      await userRepo.save(new MockUser());

      await expect(
        userService.registerUser({
          email: "test@example.com",
          password: "password",
          fullName: "Test User",
          role: UserRoleEnum.CUSTOMER,
        })
      ).rejects.toThrow(NotFoundError);
    });

    it("should register a new user", async () => {
      const result = await userService.registerUser({
        email: "new@example.com",
        password: "password",
        fullName: "New User",
        role: UserRoleEnum.CUSTOMER,
      });

      expect(result).toEqual({
        role: UserRoleEnum.CUSTOMER,
        email: "new@example.com",
        id: expect.any(String),
        accessToken: expect.any(String),
      });
    });
  });

  describe("login", () => {
    it("should throw an error if email does not exist", async () => {
      await expect(
        userService.login({
          email: "nonexistent@example.com",
          password: "password",
        })
      ).rejects.toThrow(BadRequestError);
    });

    it("should throw an error if password is incorrect", async () => {
      await userRepo.save(new MockUser());

      await expect(
        userService.login({
          email: "test@example.com",
          password: "wrongpassword",
        })
      ).rejects.toThrow(BadRequestError);
    });

    it("should login user if email and password are correct", async () => {
      const user = new MockUser();
      await userRepo.save(user);

      const result = await userService.login({
        email: "test@example.com",
        password: "password",
      });

      expect(result).toEqual({
        role: UserRoleEnum.CUSTOMER,
        email: "test@example.com",
        id: user.id,
        accessToken: expect.any(String),
      });
    });
  });
});
