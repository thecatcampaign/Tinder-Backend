import { PubSubModule } from './../pubsub/pubsub.module';
import { MessageModule } from './../message/message.module';
import { MatchRepository } from './match.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MatchResolver } from './match.resolver';
import { MatchService } from './match.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MatchRepository]), MessageModule, UserModule, PubSubModule],
  providers: [MatchResolver, MatchService],
  exports: [MatchService],
})
export class MatchModule {}
