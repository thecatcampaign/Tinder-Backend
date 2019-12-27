import { EntityRepository, Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@EntityRepository(Pokemon)
export class PokemonRepository extends Repository<Pokemon> {
    
}
