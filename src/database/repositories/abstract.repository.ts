import {
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { Database } from "../database";

type Options<T> = {
  relations?: FindOptionsRelations<T>;
  order?: FindOptionsOrder<T>;
};

export abstract class AbstractRepository<Entity extends { id: string }> {
  protected repository!: Repository<Entity>;
  private entity: EntityTarget<Entity>;

  protected relations: FindOptionsRelations<Entity>;
  protected order: FindOptionsOrder<Entity>;

  constructor(entity: EntityTarget<Entity>, options: Options<Entity> = {}) {
    const { relations = {}, order = {} } = options;

    this.entity = entity;
    this.relations = relations;
    this.order = order;
  }

  public init() {
    this.repository = Database.AppDataSource.getRepository(this.entity);
  }

  public async getList(
    options: FindManyOptions<Entity> = {},
  ): Promise<Entity[]> {
    const data = await this.repository.find({
      ...options,
      relations: {
        ...this.relations,
        ...options.relations,
      },
      order: {
        ...this.order,
        ...options.order,
      },
    });

    return data;
  }

  public async getOne(id: Entity["id"]): Promise<Entity> {
    const entity = await this.repository.findOneOrFail({
      where: { id } as FindOptionsWhere<Entity>,
      relations: this.relations,
      order: this.order,
    });

    return entity;
  }

  public async create(payload: DeepPartial<Entity>) {
    return this.repository.save(payload);
  }

  public async update(id: Entity["id"], payload: DeepPartial<Entity>) {
    const entity = await this.repository.findOneByOrFail({
      id,
    } as FindOptionsWhere<Entity>);

    const updatedEntity = {
      ...entity,
      ...payload,
    };

    return this.repository.save(updatedEntity);
  }

  public async deleteOne(id: Entity["id"]) {
    await this.repository.delete(id);
  }
}
