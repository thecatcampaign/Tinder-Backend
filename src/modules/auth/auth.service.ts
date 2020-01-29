import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { RegisterInput } from '../user/input/register.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email }: JwtPayload): Promise<User> {
    return await this.userService.findUserByEmail(email);
  }

  async login(
    authCredentialsInput: RegisterInput,
  ): Promise<string> {
    const email: string = await this.userService.validateUserPassword(authCredentialsInput);

    if (!email) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken ;
  }
}
