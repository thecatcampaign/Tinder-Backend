import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CreatePokemonDto {
  @Field()
  readonly id?: string;

  @Field()
  readonly name: string;

  @Field()
  readonly type: string;

  @Field()
  readonly pokedex: number;
}
