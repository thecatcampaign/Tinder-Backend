import { AddRolesToUserInput } from './../role/inputs/add-roles-to-user.input';
import { ErrorEnum } from './../../shared/constants/error.constant';
import { EntityNameEnum } from './../../shared/constants/entity-name.constant';
import { curlUtil } from './../../utils/curd.util';
import { GetUserInput } from './input/getUser.input';
import { RegisterInput } from './input/register.input';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from '../role/role.entity';
import { UpdateUserInput } from './input/update-user.input';
import { RoleService } from '../role/role.service';
import { RoleEnum } from '../role/enums/role.enum';
import { ReactionRepository } from '../reaction/reaction.repository';
import { Reaction } from '../reaction/reaction.entity';
import { Not, In, getRepository } from 'typeorm';
import { Match } from '../match/match.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private roleService: RoleService,
    private reactionRepository: ReactionRepository,
  ) {}

  async getUsersThatHaveNotSeen(userId: number): Promise<User[]> {
    const likes = await this.reactionRepository.find({
      where: { userId },
      select: ['toUserId'],
    });

    const matches = await getRepository(Match)
      .createQueryBuilder()
      .where('match.firstUserId = :userId OR match.secondUserId = :userId', {
        userId,
      })
      .getMany();
      
    const usersIdsMatched = matches.map(match =>
      userId !== match.firstUserId ? match.firstUserId : match.secondUserId,
    );
console.log('usersIdsmated', usersIdsMatched)
    const usersIdsLiked = likes.map(user => user.toUserId);
    return await this.userRepository.find({
      id: Not(In([...usersIdsMatched, ...usersIdsLiked])),
    });
  }

  async register(registerInput: RegisterInput): Promise<User> {
    const { email, password, name } = registerInput;
    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    console.log('name', name);
    try {
      await user.save();
    } catch (error) {
      // console.log('error', error);
      throw new ConflictException(ErrorEnum.DUPLICATION_EMAIL);
    }
    return user;
  }

  async findUserById({ userId }: GetUserInput): Promise<User> {
    return await this.userRepository.findOne(userId);
  }

  async findUsersByIds(userIds: number[]): Promise<User[]> {
    return await this.userRepository.findByIds(userIds);
  }

  async findAll(): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');
    const users = await query.getMany();
    return users;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async validateUserPassword({
    email,
    password,
  }: RegisterInput): Promise<string> {
    const user: User = await this.findUserByEmail(email);

    if (user && user.validatePassword(password)) {
      return user.email;
    } else return null;
  }

  async findUserRelationByUserId(
    userId: number,
    relationProperty: string,
  ): Promise<any[]> {
    return this.userRepository
      .createQueryBuilder()
      .relation(relationProperty)
      .of(userId)
      .loadMany();
  }

  async updateUser(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await curlUtil.commonUpdate(
      this.userRepository,
      id,
      updateUserInput,
    );
  }

  async deleteUser(id: number): Promise<User> {
    return await curlUtil.commonDelete(this.userRepository, id);
  }

  async updateRolesToUser(
    roleNames: RoleEnum[],
    userId: number,
  ): Promise<User> {
    const relationArgs: { roles?: Role[] } = {};
    relationArgs.roles = await this.roleService.findRolesByName(roleNames);
    return await curlUtil.commonUpdate(
      this.userRepository,
      userId,
      undefined,
      relationArgs,
    );
  }

  async getGirlsWhoLikeMe(currentUserId: number): Promise<User[]> {
    const liker: Reaction[] = await this.reactionRepository.find({
      where: { toUserId: currentUserId, type: 'LIKE' },
    });

    const likerIds: number[] = liker.map(liker => liker.fromUserId);

    return await this.findUsersByIds(likerIds);
  }
}
