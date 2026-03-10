import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

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

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  uploadedBy: User;

  @Column()
  uploadedById: number;
}
