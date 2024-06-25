import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../database";
import { UserRoleEnum } from "../../interfaces";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ default: UserRoleEnum.CUSTOMER })
  role: UserRoleEnum;
}
