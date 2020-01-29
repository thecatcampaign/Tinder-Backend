import { registerEnumType } from 'type-graphql'

export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MOD = 'MOD',
  OWNER = 'OWNER', 
}

registerEnumType(RoleEnum, { name: 'RoleEnum' })