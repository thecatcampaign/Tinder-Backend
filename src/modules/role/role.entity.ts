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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('roles')
@ObjectType()
export class Role extends _BaseEntity {
  @Field()
  @Column()
  name: string;

  @ManyToMany(
    type => User,
    user => user.roles,
  )
  @Field(() => [User], { nullable: true })
  users?: User[];
}
