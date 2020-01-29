import { UserRepository } from './user.repository';
import { EntityNameEnum } from './../../shared/constants/entity-name.constant';
import { UserService } from './user.service';
import { _BaseEntity } from '../../shared/entity/_base.entity';
import { RoleEnum } from '../role/enums/role.enum';
import { Int, Field, ObjectType } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { Role } from '../role/role.entity';

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
  Repository,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Match } from '../match/match.entity';

@Entity()
@ObjectType()
@Unique(['email'])
export class User extends _BaseEntity {
  @Field()
  @Column({
    default: 'https://i.imgur.com/hVpQuwh.jpg',
  })
  avatar: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @ManyToMany(
    type => Role,
    role => role.users,
    { eager: true },
  )
  @JoinTable()
  @Field(() => [Role], { nullable: true })
  roles?: Role[];

  // @ManyToMany(
  //   type => Match,
  //   match => match.users,  )
  // @JoinTable()
  // @Field(() => [Match], { nullable: true })
  // matches?: Match[];

  // Virtual Field (not in DB)
  @Field(() => [String], { nullable: true })
  flatRoles?: string[];

  //For return value in match resolver, 
  @Field(() => Int, { nullable: true })
  matchId?: number;

  //
  async validatePassword(password: string): Promise<boolean> {
    const hashPassword = await bcrypt.hash(password, this.salt);
    return this.password === hashPassword;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(): Promise<void> {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);
  }

  hasAnyRole(roles: String[]): boolean {
    return this.roles && this.roles.some(role => roles.includes(role.name));
  }

  async isOwner(
    userRepository: UserRepository,
    resource: string,
    idRelationalEntity: Number,
  ): Promise<boolean> {
    //resource is User class
    if (resource === EntityNameEnum.USER) {
      return this.id === idRelationalEntity;
    }

    return !!userRepository
      .createQueryBuilder()
      .innerJoinAndSelect(
        `user.${resource}`,
        `${resource}`,
        `${resource}.id = :idRelationalEntity`,
        { idRelationalEntity },
      )
      .getOne();
  }
}
