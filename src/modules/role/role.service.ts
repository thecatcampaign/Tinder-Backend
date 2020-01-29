import { RoleEnum } from './enums/role.enum';
import { RoleRepository } from './role.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { In } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: RoleRepository,
  ) {}
  async findRolesByName(roleName: RoleEnum[]): Promise<Role[]> {
    const roles = await this.roleRepository.find({
      where: { name: In(roleName) },
    });
    return roles;
  }

  async findRelationalUsersByRoleId(
    roleId: number,
    userProperty: string,
  ): Promise<User[]> {
    return await this.roleRepository
      .createQueryBuilder()
      .relation(userProperty)
      .of(roleId)
      .loadMany();
  }
}
