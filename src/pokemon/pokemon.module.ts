import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonResolver } from './pokemon.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonRepository } from './pokemon.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonRepository])],
  providers: [PokemonService, PokemonResolver],
})
export class PokemonModule {}
