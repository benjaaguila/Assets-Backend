import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;

  @Column()
  clientId: string;

  @Column()
  managerId: string;

  @Column()
  debtorId: string;

  @Column({ type: 'date' })
  paymentDate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Client, (client) => client.payments)
  client: Client;

  @ManyToOne(() => Client, (manager) => manager.payments)
  manager: Client;

  @ManyToOne(() => Client, (debtor) => debtor.payments)
  debtor: Client;
}
