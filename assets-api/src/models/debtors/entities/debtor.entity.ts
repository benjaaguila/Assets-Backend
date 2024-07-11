import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

@Entity({ name: 'debtors' })
export class Debtor {
  @PrimaryGeneratedColumn('uuid')
  debtorId: string;

  @Column()
  rut: string;

  @Column()
  totalPayments: number;

  @OneToMany(() => Payment, (payment) => payment.debtor)
  payments: Payment[];
}
