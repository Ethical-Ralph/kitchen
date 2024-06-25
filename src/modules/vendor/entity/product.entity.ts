import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../../database";
import { Vendor } from "./vendor.entity";

@Entity({ name: "product" })
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column("decimal")
  price: number;

  @Column()
  vendorId: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.products)
  @JoinColumn({ name: "vendorId" })
  vendor?: Vendor;

  @Column()
  category: string;

  @Column("int")
  stockQuantity: number;
}
