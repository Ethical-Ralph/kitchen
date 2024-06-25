export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}
export class PaginationDto {
  readonly order: Order = Order.DESC;

  readonly page: number = 1;

  readonly limit: number = 50;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
