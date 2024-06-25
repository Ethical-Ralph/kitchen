import { Entity, Column, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../database";
import { Product } from "./product.entity";
import { User } from "../../user/entity/user.entity";

@Entity({ name: "vendor" })
export class Vendor extends BaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contactEmail: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Product, (product) => product.vendor)
  products: Product[];

  @Column()
  userId: string;

  @OneToOne(() => User, { cascade: true, onDelete: "CASCADE" })
  user: User;
}
