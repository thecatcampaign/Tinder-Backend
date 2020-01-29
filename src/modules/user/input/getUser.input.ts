import { InputType, Field, Int } from "type-graphql";
import { IsNumber, IsOptional } from "class-validator";

@InputType()
export class GetUserInput {
    @Field(() => Int)
    @IsNumber()
    userId: number
}