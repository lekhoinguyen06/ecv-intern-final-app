import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('text')
  email: string;

  @Column('text')
  name: string;

  @Column('int')
  age: number;

  @Column({
    type: 'enum',
    enum: ['Male', 'Femele', 'Other'],
    default: 'ghost',
  })
  sex: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 50 })
  jobTitle: string;

  @Column('simple-array')
  studies: string[];

  @Column('simple-array')
  interests: string[];

  @Column('text')
  notes: string;
}
