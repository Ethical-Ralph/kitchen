export enum UserRoleEnum {
  CUSTOMER = "customer",
  VENDOR = "vendor",
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRoleEnum;
}
