import { Test, TestingModule } from '@nestjs/testing';
import { MatchResolver } from './match.resolver';

describe('MatchResolver', () => {
  let resolver: MatchResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchResolver],
    }).compile();

    resolver = module.get<MatchResolver>(MatchResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
