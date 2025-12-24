import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  name?: string;

  @Column('int', { nullable: true })
  age?: number;

  @Column({
    type: 'enum',
    enum: ['Male', 'Female', 'Other'],
    nullable: true,
  })
  sex?: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('varchar', { length: 50, nullable: true })
  jobTitle?: string;

  @Column('simple-array', { nullable: true })
  studies?: string[];

  @Column('simple-array', { nullable: true })
  interests?: string[];

  @Column('text', { nullable: true })
  notes?: string;
}
