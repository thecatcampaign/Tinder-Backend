import { ReactionService } from './../reaction/reaction.service';
import { EntityNameEnum } from './../../shared/constants/entity-name.constant';
import { Int } from 'type-graphql';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from './../role/role.entity';
import { GqlAuthGuard } from '../auth/guards/gqlAuthUser.guard';
import { GetUserInput } from './input/getUser.input';
import { User } from './user.entity';
import { RegisterInput } from './input/register.input';
import {
  Resolver,
  Args,
  Query,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { UpdateUserInput } from './input/update-user.input';
import { RoleEnum } from '../role/enums/role.enum';
import { GqlUser } from '../auth/decorators/gpl-user.decorators';
import { HasAnyRole } from '../auth/decorators/roles.decorator';
import { Match } from '../match/match.entity';

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService,
) {}

  @ResolveProperty(returns => [Role])
  async roles(@Parent() user: User): Promise<Role[] | undefined> {
    return await this.userService.findUserRelationByUserId(user.id, 'roles');
  }

  @Query(returns => User, { name: 'user' })
  async getUser(@Args('input') getUserInput: GetUserInput): Promise<User> {
    return await this.userService.findUserById(getUserInput);
  }

  @Query(returns => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard, RoleGuard)
  @HasAnyRole({
    resource: EntityNameEnum.USER,
    roles: [RoleEnum.ADMIN],
  })
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Mutation(returns => User)
  async register(@Args('input') registerInput: RegisterInput): Promise<User> {
    return await this.userService.register(registerInput);
  }

  @Query(returns => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async getMyAccount(@GqlUser() user: User): Promise<User> {
    return await this.userService.findUserByEmail(user.email);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('input') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserInput);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard, RoleGuard)
  @HasAnyRole({
    resource: 'user',
    roles: [RoleEnum.ADMIN, RoleEnum.OWNER],
  })
  async deleteUser(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<User> {
    return await this.userService.deleteUser(id);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard, RoleGuard)
  @HasAnyRole({
    resource: 'user',
    roles: [RoleEnum.ADMIN],
  })
  // have no idea why I cannot roleNames is undefined when use Input or argsTYpe
  async updateRolesToUser(
    @Args({ name: 'roleNames', type: () => [RoleEnum] }) roleNames: RoleEnum[],
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ): Promise<any> {
    return await this.userService.updateRolesToUser(roleNames, userId)
  }

  @Query(returns => [User], {name: 'likers'})
  @UseGuards(GqlAuthGuard)
  async getGirlsWhoLikeMe(@GqlUser() currentUser: User): Promise<User[]> {
    return await this.userService.getGirlsWhoLikeMe(currentUser.id)
  }

  @Query(returns => [User], {name: 'discover'})
  @UseGuards(GqlAuthGuard)
  async getUsersThatHaveNotSeen(@GqlUser() currentUser: User): Promise<User[]> {
    return await this.userService.getUsersThatHaveNotSeen(currentUser.id)
  }
}
