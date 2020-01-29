import { EntityRepository, Repository } from 'typeorm';
import { Match } from './match.entity';

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
    findByName(clientName: string) {
        return this.findOne({ where: {clientName} });
    }
}
