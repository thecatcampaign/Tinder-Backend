import { _BaseEntity } from '../../shared/entity/_base.entity';
import { Int, Field, ObjectType } from 'type-graphql';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Match } from '../match/match.entity';

@Entity()
@ObjectType()
export class Message extends _BaseEntity {

  @Field()
  @Column()
  bodyContent: string;

  @Field(()=> Int)
  @Column()
  senderUserId: number;

  // @Field(()=> Int)
  // matchId: number

  @Field(()=> Match)
  @ManyToOne(() => Match, match => match.messages)
  @JoinColumn()
  match: Match;
  
}
