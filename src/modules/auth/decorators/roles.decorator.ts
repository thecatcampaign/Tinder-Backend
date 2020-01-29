import { IRoles } from './../../role/interfaces/roles.interface';

import { SetMetadata } from '@nestjs/common';
export const rolesMetadataKey = 'roles'
export const HasAnyRole = (roles: IRoles) => SetMetadata(rolesMetadataKey, roles);