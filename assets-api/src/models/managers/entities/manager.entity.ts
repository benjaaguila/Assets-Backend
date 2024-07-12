import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

@Entity({ name: 'managers' })
@Unique(['name'])
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  managerId: string;

  @Column()
  name: string;

  @OneToMany(() => Payment, (payment) => payment.manager)
  payments: Payment[];
}
