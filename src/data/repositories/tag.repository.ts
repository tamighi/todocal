import { TagEntity } from "../local/tag.entity";
import { AbstractRepository } from "./abstract.repository";

class TagRepository extends AbstractRepository<TagEntity> {
  constructor() {
    super(TagEntity);
  }
}

export default TagRepository;
