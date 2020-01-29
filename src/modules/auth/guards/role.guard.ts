import { RoleEnum } from './../../role/enums/role.enum';
import { UserRepository } from './../../user/user.repository';
import { UserService } from './../../user/user.service';
import { IRoles } from './../../role/interfaces/roles.interface';
import { User } from '../../user/user.entity';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { rolesMetadataKey } from '../decorators/roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository) {}

  protected getUser(context: GraphQLExecutionContext): User {
    const ctx = context.getContext();

    return ctx && ctx.req && ctx.req.user;
  }

  protected getIdArg(context: GraphQLExecutionContext): Number {
    const args = context.getArgs();

    return args && args.id
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {resource, roles}: IRoles = this.reflector.get(rolesMetadataKey, context.getHandler());
    const ctx = GqlExecutionContext.create(context)
    const user = this.getUser(ctx);
    const idArg = this.getIdArg(ctx)

    let isOwner = false
    if (roles.includes(RoleEnum.OWNER)) {
      isOwner = await user.isOwner(this.userRepository , resource, idArg) 
    }

    return user.hasAnyRole(roles) || isOwner

  }
}