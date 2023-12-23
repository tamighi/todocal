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

  public async mutate(payload: DeepPartial<Entity>) {
    let entity: Entity;
    if (payload.id) {
      entity = await this.repository.update(payload.id, payload);
    } else {
      entity = await this.repository.create(payload);
    }

    return this.entityToType(entity);
  }

  public async create(payload: DeepPartial<Entity>) {
    const entity = await this.repository.create(payload);
    return this.entityToType(entity);
  }

  public async delete(id: string) {
    return this.repository.deleteOne(id);
  }

  public abstract entityToType(entity: Entity): T;
}
