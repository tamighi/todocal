import { AbstractRepository } from "@/database";
import { DeepPartial, FindManyOptions } from "typeorm";

export default abstract class AbstractService<
  Entity extends { id: string },
  T extends { id: string },
  Repository extends AbstractRepository<Entity>,
> {
  protected repository: Repository;

  constructor(repository: Repository) {
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

  public async update(payload: DeepPartial<Entity> & { id: string }) {
    const entity = await this.repository.update(payload.id, payload);
    return this.entityToType(entity);
  }

  public async create(payload: DeepPartial<Entity>) {
    const entity = await this.repository.create(payload);
    return this.entityToType(entity);
  }

  public async delete(payload: DeepPartial<Entity> & { id: string }) {
    return this.repository.deleteOne(payload.id);
  }

  public abstract entityToType(entity: Entity): T;
}
