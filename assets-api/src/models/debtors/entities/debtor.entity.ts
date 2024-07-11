import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

@Entity({ name: 'debtors' })
@Unique(['rut'])
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
