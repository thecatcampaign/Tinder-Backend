import { User } from './../user/user.entity';
import { AddMessageInput } from './input/add-message.input';
import { MessageService } from './message.service';
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Message } from './message.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gqlAuthUser.guard';
import { GqlUser } from '../auth/decorators/gpl-user.decorators';
import { Int } from 'type-graphql';
import { RoleGuard } from '../auth/guards/role.guard';
import { HasAnyRole } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';

@Resolver(of => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(returns => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessagesByMatchId(
    @Args({ name: 'matchId', type: () => Int }) matchId: number,
  ): Promise<Message[]> {
    return await this.messageService.getMessagesByMatchId(matchId);
  }

  @Mutation(returns => Message)
  @UseGuards(GqlAuthGuard)
  async addMessage(
    @Args('input') addMessageInput: AddMessageInput,
    @GqlUser() currentUser: User,
  ): Promise<Message> {
    return await this.messageService.addMessage(
      currentUser.id,
      addMessageInput,
    );
  }
}
