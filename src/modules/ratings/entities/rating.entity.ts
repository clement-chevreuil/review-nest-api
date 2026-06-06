import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  rating!: number;

  @Column({ type: 'text', nullable: true })
  name!: string | null;

  @Column({ type: 'text' })
  tripDate!: string;

  @Column({ type: 'text' })
  createdAt!: string;
}
