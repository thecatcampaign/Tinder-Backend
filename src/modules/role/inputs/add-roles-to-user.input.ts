import { RoleEnum } from './../enums/role.enum';
import { InputType, Field, Int } from "type-graphql";
import { IsNumber, IsOptional } from "class-validator";

@InputType()
export class AddRolesToUserInput {
    @Field(() => [RoleEnum])
    roleNames: RoleEnum[]

    @Field(() => Int)
    @IsNumber()
    userId: number
}