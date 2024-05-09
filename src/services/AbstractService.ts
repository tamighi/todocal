import { AbstractRepository } from "@/database";
import { FindManyOptions } from "typeorm";

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

  public async update(obj: Partial<T> & { id: string }) {
    const entity = await this.repository.update(
      obj.id,
      this.typeToEntity(obj as T),
    );
    return this.entityToType(entity);
  }

  public async create(obj: Partial<T>) {
    const entity = await this.repository.create(this.typeToEntity(obj));
    return this.entityToType(entity);
  }

  public async delete(payload: Partial<T> & { id: string }) {
    return this.repository.deleteOne(payload.id);
  }

  public abstract entityToType(entity: Entity): T;
  public abstract typeToEntity(obj: Partial<T>): Entity;
}
