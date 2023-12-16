import {
  EntityTarget,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { Database } from "../local/database";

type Options<T> = {
  relations?: FindOptionsRelations<T>;
};

export abstract class AbstractRepository<Entity extends { id: string }> {
  protected repository: Repository<Entity>;
  protected relations: FindOptionsRelations<Entity>;

  constructor(entity: EntityTarget<Entity>, options: Options<Entity> = {}) {
    const { relations = {} } = options;

    this.repository = Database.AppDataSource.getRepository(entity);
    this.relations = relations;
  }

  public async getList(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    const todos = await this.repository.find(options);

    return todos;
  }

  public async getOne(id: Entity["id"]): Promise<Entity> {
    const entity = await this.repository.findOneOrFail({
      where: { id } as FindOptionsWhere<Entity>,
      relations: this.relations,
    });

    return entity;
  }

  public async create(payload: Entity) {
    await this.repository.save(payload);
  }

  public async update(id: Entity["id"], payload: Entity) {
    const entity = await this.repository.findOneByOrFail({
      id,
    } as FindOptionsWhere<Entity>);

    const updatedEntity = {
      ...entity,
      ...payload,
    };

    await this.repository.save(updatedEntity);
  }

  public async deleteOne(id: Entity["id"]) {
    await this.repository.delete(id);
  }
}