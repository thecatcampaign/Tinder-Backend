import { Field, InputType } from "type-graphql";
import { IsEmail, MinLength, IsString, IsOptional } from "class-validator";
import { User } from "../user.entity";

@InputType()
export class RegisterInput implements Partial<User> {
    
    @Field({nullable: true})
    @IsString() //resolver don't get this field if don't have this line
    @IsOptional()
    name?: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(4)
    password: string
}