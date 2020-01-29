import { MatchService } from './match.service';
import {
  Resolver,
  ResolveProperty,
  Parent,
  Query,
  Args,
  Subscription,
} from '@nestjs/graphql';
import { Message } from '../message/message.entity';
import { Match } from './match.entity';
import { MessageService } from '../message/message.service';
import { GqlUser } from '../auth/decorators/gpl-user.decorators';
import { User } from '../user/user.entity';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gqlAuthUser.guard';
import { IMatchedPartner } from 'src/shared/interfaces/matched-partner.interface';
import { PubSub } from 'graphql-subscriptions'
import { Int } from 'type-graphql';

@Resolver(of => Match)
export class MatchResolver {
  constructor(
    private readonly matchService: MatchService,
    private readonly messageService: MessageService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,

  ) {}

  @ResolveProperty(returns => [Message])
  async messages(@Parent() match: Match): Promise<Message[]> {
    return await this.messageService.getMessagesByMatchId(match.id);
  }

  @Query(returns => [User], { name: 'matches' })
  @UseGuards(GqlAuthGuard)
  async getMatchedPartnersByUserId(
    @GqlUser() currentUser: User,
  ): Promise<IMatchedPartner[]> {
    return await this.matchService.getMatchedPartnersByUserId(currentUser.id);
  }

  @Subscription(returns => Match, {
    filter: (payload, variables, context) => {
      console.log('p', payload.matchAdded.firstUserId, variables.userId)
      return payload.matchAdded.firstUserId === variables.userId
    }
  })
  matchAdded(@Args({ name: 'userId', type: () => Int }) userId: number ) {
    return this.pubSub.asyncIterator('matchAdded');
  }
}
