import { Repository } from "typeorm";
import { BaseRepository, dataSource } from "../../../database";
import { User } from "../entity/user.entity";

export class UserRepo extends BaseRepository<User> {
  constructor(repository: Repository<User> = dataSource.getRepository(User)) {
    super(repository);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email: email.toLowerCase() } });
  }
}
