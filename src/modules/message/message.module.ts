import { UserRepository } from './../user/user.repository';
import { UserModule } from './../user/user.module';
import { MessageRepository } from './message.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { MatchRepository } from '../match/match.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MatchRepository, MessageRepository, UserRepository])],
  providers: [MessageResolver, MessageService],
  exports: [MessageService]
})
export class MessageModule {}
