import { Reaction } from './reaction.entity';
import { ReactionService } from './reaction.service';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gqlAuthUser.guard';
import { GqlUser } from '../auth/decorators/gpl-user.decorators';
import { User } from '../user/user.entity';
import { Int } from 'type-graphql';
import { Match } from '../match/match.entity';

@Resolver(of => Reaction)
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Mutation(returns => Reaction)
  @UseGuards(GqlAuthGuard)
  async disLike(
    @Args({ name: 'toUserId', type: () => Int }) toUserId: number,
    @GqlUser() currentUser: User,
  ): Promise<Reaction> {
    return await this.reactionService.disLike(toUserId, currentUser);
  }

  @Mutation(returns => Reaction)
  @UseGuards(GqlAuthGuard)
  async like(
    @Args({ name: 'toUserId', type: () => Int }) toUserId: number,
    @GqlUser() currentUser: User,
  ): Promise<Reaction | Match> {
    return await this.reactionService.like(toUserId, currentUser);
  }
}
