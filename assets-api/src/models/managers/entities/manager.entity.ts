import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

@Entity({ name: 'managers' })
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  managerId: string;

  @Column()
  name: string;

  @OneToMany(() => Payment, (payment) => payment.manager)
  payments: Payment[];
}
