import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

@Entity({ name: 'clients' })
@Unique(['name'])
export class Client {
  @PrimaryGeneratedColumn('uuid')
  clientId: string;
  
  @Column()
  name: string;

  @OneToMany(() => Payment, (payment) => payment.client)
  payments: Payment[];
}
