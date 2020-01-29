import { _BaseEntity } from '../../shared/entity/_base.entity';
import { Int, Field, ObjectType } from 'type-graphql';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('hi', ['fromUserId', 'toUserId'])
@ObjectType()
export class Reaction extends _BaseEntity {
  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  fromUserId: number;

  @Field()
  @Column()
  toUserId: number;
}
