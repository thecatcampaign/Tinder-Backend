import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
@Module({
    providers: [
      {
        provide: 'PUB_SUB',
        useClass: PubSub,
        // useValue: new PubSub(),
        // useFactory: () => {
        //  return new PubSub();
        // }
      }
    ],
    exports: ['PUB_SUB'],
  })
  export class PubSubModule {}