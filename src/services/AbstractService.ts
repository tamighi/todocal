import { AbstractRepository } from "@/database";
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
    let model: T;
    if (payload.id) {
      model = await this.update(payload.id, payload);
    } else {
      model = await this.create(payload);
    }

    return model;
  }

  public async update(id: string, payload: DeepPartial<Entity>) {
    const entity = await this.repository.update(id, payload);
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
