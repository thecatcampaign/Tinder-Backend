import { inputPokemon } from './input/pokemon.input';
import { CreatePokemonDto } from './dto/add-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

@Resolver()
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Mutation(() => CreatePokemonDto)
  async createPokemon(@Args('data') data: inputPokemon) {
    return this.pokemonService.createPokemon(data);
  }

  @Query(() => [CreatePokemonDto])
  async pokemon() : Promise<CreatePokemonDto[]> {
    return this.pokemonService.getPokemons();
  }
}
