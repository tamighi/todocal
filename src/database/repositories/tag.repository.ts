import { TagEntity } from "../entities";
import { AbstractRepository } from "./abstract.repository";

class TagRepository extends AbstractRepository<TagEntity> {
  constructor() {
    super(TagEntity);
  }
}

export default TagRepository;
