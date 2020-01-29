import { Reaction } from './reaction.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Reaction)
export class ReactionRepository extends Repository<Reaction> {

}
