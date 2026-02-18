import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  category: string;

  @CreateDateColumn()
  date: Date;

  @Column({ nullable: true })
  customerEmail: string;
}
