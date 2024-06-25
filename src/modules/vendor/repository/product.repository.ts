import { Repository } from "typeorm";
import { BaseRepository, dataSource } from "../../../database";
import { Product } from "../entity";

export class ProductRepo extends BaseRepository<Product> {
  constructor(
    repository: Repository<Product> = dataSource.getRepository(Product)
  ) {
    super(repository);
  }
}
