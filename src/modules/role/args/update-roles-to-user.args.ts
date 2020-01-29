import { RoleEnum } from './../enums/role.enum';
import { Field, Int, ArgsType } from 'type-graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class UpdateRolesToUserArgs {
  @Field((type) => [RoleEnum])
  roleNames: RoleEnum[];

  @Field(() => Int)
  @IsNumber()
  userId: number;
}
