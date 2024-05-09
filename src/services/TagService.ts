import { Tag } from "@/models";
import { TagEntity, TagRepository, tagRepository } from "@/database";

import AbstractService from "./AbstractService";

class TagService extends AbstractService<TagEntity, Tag, TagRepository> {
  constructor() {
    super(tagRepository);
  }

  public entityToType(entity: TagEntity): Tag {
    return TagService.entityToType(entity);
  }

  public typeToEntity(obj: Tag): TagEntity {
    return obj;
  }

  public static entityToType(entity: TagEntity): Tag {
    return entity;
  }
}

export default TagService;
