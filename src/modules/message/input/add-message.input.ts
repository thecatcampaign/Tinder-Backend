import { Field, InputType, Int } from 'type-graphql';
import { IsEmail, MinLength, IsString, IsOptional, IsNumber } from 'class-validator';
import { Message } from '../message.entity';

@InputType()
export class AddMessageInput implements Partial<Message> {
  @Field()
  @IsString()
  bodyContent: string;

  @Field(() => Int)
  @IsNumber()
  matchId: number;

}
