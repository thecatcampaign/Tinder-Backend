import { RoleEnum } from './enums/role.enum';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { Resolver, ResolveProperty, Parent, Args, Query, Mutation } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@Resolver(of => Role)
export class RoleResolver {
    constructor(private roleService: RoleService) {}

    @ResolveProperty(returns => [User])
    async users(@Parent() role: Role): Promise<User[]> {
      return await this.roleService.findRelationalUsersByRoleId(role.id, 'users');
    }

    @Query(returns => Role)
    async role(@Args({name: 'name', type: () => RoleEnum}) roleName: RoleEnum): Promise<Role> {
        const role = await this.roleService.findRolesByName([roleName])
        return role[0]
    }
 

}
