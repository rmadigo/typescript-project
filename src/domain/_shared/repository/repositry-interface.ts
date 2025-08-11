export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  findOne(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
