import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class _BaseEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  @Field(type => Int, { nullable: true })
  id: number;
  
  @Field()
  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @Field()
  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;
}