import { EntityNameEnum } from './../shared/constants/entity-name.constant';
import { ErrorEnum } from './../shared/constants/error.constant';
import { User } from './../modules/user/user.entity';
import _ from 'lodash';
import { Repository, BaseEntity } from 'typeorm';
import {
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';

const commonUpdate = async (
  repository: Repository<any>,
  id: number,
  args: Object = {},
  relationArgs: Object = {},
): Promise<any> => {
  const prevItem = await repository.findOne(id);
  if (!prevItem) {
    throw new NotFoundException(ErrorEnum.NOT_FOUND_ID);
  }

  return await repository.save({
    ...prevItem,
    ...args,
    ...relationArgs,
  });
};

const commonDelete = async (
  repository: Repository<any>,
  id: number,
): Promise<any> => {
  const prevItem = await repository.findOne(id);
  if (!prevItem) {
    throw new NotFoundException(ErrorEnum.NOT_FOUND_ID);
  }

  return await repository.remove(prevItem);
};



export const curlUtil = {
  commonUpdate,
  commonDelete,
};
