import { IMatchedPartner } from './../../shared/interfaces/matched-partner.interface';
import { UserService } from './../user/user.service';
import { EntityNameEnum } from './../../shared/constants/entity-name.constant';
import { MatchRepository } from './match.repository';
import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: MatchRepository,
    private readonly userService: UserService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  async createMatch(firstUserId: number, secondUserId: number): Promise<Match> {
    const match = new Match();
    match.firstUserId = firstUserId;
    match.secondUserId = secondUserId;

    try {
      await match.save();
    } catch (error) {
      console.log('error create match', error);
      throw new ConflictException();
    }

    this.pubSub.publish('matchAdded', {matchAdded: match})
    return match;
  }

  async getMatchedPartnersByUserId(userId: number): Promise<IMatchedPartner[]> {
    // equal Promise<User & {matchId: number}[]>

    const matches = await this.matchRepository.find({
      where: [{ firstUserId: userId }, { secondUserId: userId }], // Or [{}, {}, ...]
    });
    const matchesIds = matches.map(match => match.id);
    const matchedUsersIds = matches.map(match =>
      match.firstUserId != userId ? match.firstUserId : match.secondUserId,
    );

    const matchedUsers = await this.userService.findUsersByIds(matchedUsersIds);

    //Add extra property "matchId" to User entity
    return matchedUsers.map((user, i) => ({ ...user, matchId: matchesIds[i] }));
  }
}
