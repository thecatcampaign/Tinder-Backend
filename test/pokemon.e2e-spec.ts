import { PokemonModule } from './../src/pokemon/pokemon.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';

describe('ItemsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot({
          installSubscriptionHandlers: true,
          autoSchemaFile: 'schema.gql',
        }),
        TypeOrmModule.forRoot(),
        PokemonModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const pokemon = {
    name: 'pokemon1',
    type: 'type_pokemon1',
    pokedex: 1,
  };

  const createPokemonQuery = `
  mutation {
    createPokemon(data: ${pokemon}) {
      id,
      name,
      type
    }
  }
  `;

  it('create pokemon ', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createPokemonQuery,
      })
      .expect(({ body }) => {
        const data = body.data.createPokemon;
        expect(data.name).toBe(pokemon.name);
        expect(data.type).toBe(pokemon.type);
        expect(data.pokedex).toBe(pokemon.pokedex);
      })
      .expect(200);
  });

  // test('should get pokemons', () => {
  //   return request(app.getHttpServer())
  //   .post('graphql').send({operationName: null, query: })
  // })
});
