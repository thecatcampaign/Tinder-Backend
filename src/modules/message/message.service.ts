import { EntityNameEnum } from './../../shared/constants/entity-name.constant';
import { MessageRepository } from './message.repository';
import { AddMessageInput } from './input/add-message.input';
import { Injectable } from '@nestjs/common';
import { Match } from '../match/match.entity';
import { Message } from './message.entity';
import { MatchRepository } from '../match/match.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: MatchRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  async getMessagesByMatchId(matchId: number): Promise<Message[]> {
    return await this.matchRepository
      .createQueryBuilder()
      .relation(EntityNameEnum.MESSAGES)
      .of(matchId)
      .loadMany();
  }

  async addMessage(
    userId: number,
    { matchId, bodyContent }: AddMessageInput,
  ): Promise<Message> {
    const message = new Message();
    message.bodyContent = bodyContent;
    message.senderUserId = userId;
    await message.save();

    await getConnection()
      .createQueryBuilder()
      .relation(Match, 'messages')
      .of(matchId)
      .add(message);

    return message;
  }
}
