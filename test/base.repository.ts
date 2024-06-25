import { DeleteResult, UpdateResult } from "typeorm";
import { BaseEntity, BaseRepository } from "../src/database";

class MockRepository<T extends BaseEntity> {
  private entities: T[] = [];

  async find(query?: any): Promise<T[]> {
    return this.entities;
  }

  async findAndCount(query?: any): Promise<[T[], number]> {
    return [this.entities, this.entities.length];
  }

  async findOne(query?: any): Promise<T | null> {
    return this.entities[0] || null;
  }

  async save(entity: T): Promise<T> {
    const e = { ...entity, id: (this.entities.length + 1).toString() } as T;
    this.entities.push(e);
    return e;
  }

  async update(query: any, partialEntity: any): Promise<UpdateResult> {
    return { affected: 1 } as UpdateResult;
  }

  async delete(query: any): Promise<DeleteResult> {
    return { affected: 1 } as DeleteResult;
  }

  async count(query?: any): Promise<number> {
    return this.entities.length;
  }

  async softDelete(query: any): Promise<UpdateResult> {
    return { affected: 1 } as UpdateResult;
  }
}

export class MockBaseRepository<
  T extends BaseEntity
> extends BaseRepository<T> {
  constructor() {
    super(new MockRepository<T>() as any);
  }
}
