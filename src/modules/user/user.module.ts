import { ReactionModule } from './../reaction/reaction.module';
import { RoleModule } from './../role/role.module';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { RoleRepository } from '../role/role.repository';
import { ReactionRepository } from '../reaction/reaction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ReactionRepository]), RoleModule],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
