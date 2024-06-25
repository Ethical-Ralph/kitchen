import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../database";

export enum UserRoleEnum {
  CUSTOMER = "customer",
  VENDOR = "vendor",
}

@Entity({ name: "user" })
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRoleEnum.CUSTOMER })
  role: UserRoleEnum;
}
