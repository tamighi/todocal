import { Tag } from "@/models";
import { TagEntity, tagRepository } from "@/database";

import AbstractService from "./AbstractService";

class TagService extends AbstractService<TagEntity, Tag> {
  constructor() {
    super(tagRepository);
  }

  public entityToType(entity: TagEntity): Tag {
    return {
      id: entity.id,
      name: entity.name,
      color: entity.color,
    };
  }
}

export default TagService;
