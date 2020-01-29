import { Test, TestingModule } from '@nestjs/testing';
import { ReactionResolver } from './reaction.resolver';

describe('ReactionResolver', () => {
  let resolver: ReactionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionResolver],
    }).compile();

    resolver = module.get<ReactionResolver>(ReactionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
