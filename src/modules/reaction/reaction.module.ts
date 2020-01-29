import { ReactionRepository } from './reaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReactionResolver } from './reaction.resolver';
import { ReactionService } from './reaction.service';
import { MatchModule } from '../match/match.module';
import { PubSubModule } from '../pubsub/pubsub.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionRepository]), MatchModule, PubSubModule],
  providers: [ReactionResolver, ReactionService],
  exports: [ReactionService]
})
export class ReactionModule {}
