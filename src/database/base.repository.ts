import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  Repository,
  UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BaseEntity } from "./base.entity";

export class BaseRepository<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(query?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(query);
  }

  async findAndCount(query?: FindManyOptions<T>): Promise<[T[], number]> {
    return this.repository.findAndCount(query);
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } } as FindOneOptions<T>);
  }

  async findOne(query: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(query);
  }

  async findOneByRelations(
    query: FindOneOptions<T> & { relations?: string[] }
  ): Promise<T | null> {
    return this.repository.findOne(query);
  }

  create(entity: T): T {
    return this.repository.create(entity);
  }

  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async bulkCreate(entities: T[]): Promise<T[]> {
    return this.repository.save(entities);
  }

  async update(
    query:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    return this.repository.update(query, partialEntity);
  }

  async delete(
    id:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<T>
  ): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async count(query?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(query);
  }

  async softDelete(
    id:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<T>
  ): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
}
