import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
	@PrimaryGeneratedColumn('uuid') id: string

	@Column('varchar', { length: 500, unique: true })
	name: string

	@Column('varchar', { length: 500 })
	type: string

	@Column('numeric') pokedex: number
}
