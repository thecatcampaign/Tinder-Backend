import { _BaseEntity } from '../../shared/entity/_base.entity';
import { Int, Field, ObjectType } from 'type-graphql';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class Match extends _BaseEntity {

  @Field(()=> Int, {nullable: true})
  @Column()
  firstUserId: number;

  @Field(()=> Int, {nullable: true})
  @Column()
  secondUserId: number;

  // @ManyToMany(
  //   type => User,
  //   user => user.matches,
  // )
  // @Field(() => [User], { nullable: true })
  // users?: User[];
  
  @Field(() => [Message], {nullable: true})
  @OneToMany(() => Message, message => message.match)
  messages: Message[]

}
