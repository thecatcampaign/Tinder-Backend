import { MatchService } from './../match/match.service';
import { ReactionEnum } from './enums/reaction.enum';
import { curlUtil } from './../../utils/curd.util';
import { ReactionRepository } from './reaction.repository';
import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './reaction.entity';
import { User } from '../user/user.entity';
import { Match } from '../match/match.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepository: ReactionRepository,
    private readonly matchService: MatchService,
  ) {}

  async disLike(toUserId: number, currentUser: User): Promise<Reaction> {
    const dislike = new Reaction();
    dislike.type = ReactionEnum.DISLIKE;
    dislike.toUserId = toUserId;
    dislike.fromUserId = currentUser.id;
    try {
      await dislike.save();
    } catch (error) {
      throw new ConflictException();
    }
    return dislike;
  }

  async like(toUserId: number, currentUser: User): Promise<Reaction | Match> {
    const isMatch: Reaction = await this.isMatch(currentUser.id, toUserId);

    if (isMatch) {
      const match = this.matchService.createMatch(toUserId, currentUser.id); // notify order
      this.reactionRepository.remove(isMatch); //remove related reaction once match is created
      return match;
    }

    const like = new Reaction();
    like.type = ReactionEnum.LIKE;
    like.toUserId = toUserId;
    like.fromUserId = currentUser.id;
    try {
      await like.save();
    } catch (error) {
      throw new ConflictException();
    }

    return like;
  }


  async isMatch(fromUserId: number, toUserId: number): Promise<Reaction> {
    //true if toUser liked me first
    return await this.reactionRepository.findOne({
      where: { fromUserId: toUserId, toUserId: fromUserId, type: 'LIKE' },
    });
  }
}
