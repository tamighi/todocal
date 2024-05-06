import { RepetitionEntity } from "../entities";
import { AbstractRepository } from "./abstract.repository";

class RepetitionRepository extends AbstractRepository<RepetitionEntity> {
  constructor() {
    super(RepetitionEntity);
  }
}

export default RepetitionRepository;
