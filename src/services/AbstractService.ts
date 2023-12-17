import { AbstractRepository } from "@/data/repositories/abstract.repository";
import { DeepPartial, FindManyOptions } from "typeorm";

export default abstract class AbstractService<
  Entity extends { id: string },
  T extends { id: string },
> {
  protected repository: AbstractRepository<Entity>;

  constructor(repository: AbstractRepository<Entity>) {
    this.repository = repository;
  }

  public async getList(options?: FindManyOptions<Entity>) {
    const entities = await this.repository.getList(options);
    return entities.map((entity) => this.entityToType(entity));
  }

  public async getOne(id: string) {
    const entity = await this.repository.getOne(id);
    return this.entityToType(entity);
  }

  public async create(payload: DeepPartial<Entity>) {
    return this.repository.create(payload);
  }

  public abstract entityToType(entity: Entity): T;
}
