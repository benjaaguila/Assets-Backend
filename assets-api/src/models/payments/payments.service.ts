import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async findAllPayments(): Promise<Payment[]> {
    return await this.paymentRepository.find();
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const newPayment: Payment = this.paymentRepository.create(createPaymentDto);
    return await this.paymentRepository.save(newPayment);
  }

  async hasPayments(): Promise<boolean> {
    return (await this.getPaymentsCount()) > 0;
  }

  private async getPaymentsCount(): Promise<number> {
    return await this.paymentRepository.count();
  }

}
