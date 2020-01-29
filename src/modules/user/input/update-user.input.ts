import { InputType, Field } from "type-graphql";
import { IsNumber, IsOptional, IsEmail, MinLength, Length } from "class-validator";
import { User } from "../user.entity";

@InputType()
export class UpdateUserInput implements Partial<User> {
    @IsOptional()
    @IsEmail()
    @MinLength(4)
    @Field({ nullable: true })
    email?: string;
  
    @IsOptional()
    @Length(6, 64)
    @Field({ nullable: true })
    password?: string;
}