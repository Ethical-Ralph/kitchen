import { Repository } from "typeorm";
import { BaseRepository, dataSource } from "../../../database";
import { Vendor } from "../entity";

export class VendorRepo extends BaseRepository<Vendor> {
  constructor(
    repository: Repository<Vendor> = dataSource.getRepository(Vendor)
  ) {
    super(repository);
  }

  async findByUserId(userId: string): Promise<Vendor> {
    return this.findOne({ where: { userId } }) as Promise<Vendor>;
  }
}
