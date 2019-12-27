import { CreatePokemonDto } from './dto/add-pokemon.dto';
import { PokemonRepository } from './pokemon.repository';
import { Pokemon } from './pokemon.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async getPokemons() {
    return await this.pokemonRepository.find();
  } 

  async createPokemon(data: CreatePokemonDto): Promise<Pokemon> {
    let pokemon = new Pokemon();
    pokemon.name = data.name;
    pokemon.pokedex = data.pokedex;
    pokemon.type = data.type;

    await this.pokemonRepository.save(pokemon);

    return pokemon;
  }
}
