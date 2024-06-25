import {
  PasswordHelper,
  NotFoundError,
  JWTService,
  BadRequestError,
} from "../utils";
import { User, UserRoleEnum } from "./entity";
import { UserRepo } from "./repository/user.repository";

export class UserService {
  constructor(private userRepo: UserRepo) {}

  async registerUser(data: {
    email: string;
    password: string;
    fullName: string;
    role: UserRoleEnum;
  }) {
    const emailExist = await this.userRepo.findByEmail(data.email);

    if (emailExist) {
      throw new NotFoundError("Email already exists");
    }

    const hashedPassword = await PasswordHelper.hashPassword(data.password);

    const registeredUser = await this.userRepo.save({
      ...data,
      role: data?.role || UserRoleEnum.CUSTOMER,
      password: hashedPassword,
    });

    return this.signUserToken(registeredUser);
  }

  private async signUserToken(user: User) {
    const userInfo: any = {
      role: user.role,
      email: user.email,
      id: user.id,
    };

    const token = JWTService.sign(userInfo);

    return {
      ...userInfo,
      accessToken: token,
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.userRepo.findByEmail(data.email);

    const isPasswordCorrect = user
      ? await PasswordHelper.comparePassword(data.password, user.password)
      : null;

    if (!user || !isPasswordCorrect) {
      throw new BadRequestError("Invalid email or password");
    }

    return this.signUserToken(user);
  }
}
