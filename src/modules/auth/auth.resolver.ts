import { ObjectType, Int } from 'type-graphql';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from '../user/input/register.input';

@Resolver('Auth')
export class AuthResolver {
    constructor(private authService: AuthService,
       ) {}

    @Mutation(returns => String)
    async login(@Args('input') loginInput: RegisterInput ): Promise<string> {
        return await this.authService.login(loginInput)
    }
}
