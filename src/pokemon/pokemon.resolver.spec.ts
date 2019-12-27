import { Test, TestingModule } from '@nestjs/testing';
import { PokemonResolver } from './pokemon.resolver';

describe('PokemonResolver', () => {
  let resolver: PokemonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonResolver],
    }).compile();

    resolver = module.get<PokemonResolver>(PokemonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
