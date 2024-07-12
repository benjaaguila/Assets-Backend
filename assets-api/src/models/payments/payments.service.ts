import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/payment.dto';
import { ClientsService } from '../clients/clients.service';
import { ManagersService } from '../managers/managers.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private clientsService: ClientsService,
    private managersService: ManagersService,
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

  async findPaymentsInfoByClientName(
    clientName: string,
  ): Promise<{ managerName: string; totalAmountManaged: number }[]> {
    const client = await this.clientsService.findOneClientByName(clientName);
    const managerIds = [
      ...new Set(
        (await this.findPaymentsByClientId(client.clientId)).map(
          (payment) => payment.managerId,
        ),
      ),
    ];
    const managerInfo = await Promise.all(
      managerIds.map((managerId) =>
        this.getManagerInfo(managerId, client.clientId),
      ),
    );

    return managerInfo;
  }

  async findPaymentsByClientId(clientId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: {
        clientId,
      },
    });
  }

  async getManagerInfo(
    managerId: string,
    clientId: string,
  ): Promise<{ managerName: string; totalAmountManaged: number }> {
    const manager = await this.managersService.findOneManager(managerId);
    const totalAmountManaged = await this.calculateTotalAmountByManagerId(
      clientId,
      managerId,
    );
    return {
      managerName: manager.name,
      totalAmountManaged,
    };
  }

  private async calculateTotalAmountByManagerId(
    clientId: string,
    managerId: string,
  ): Promise<number> {
    const payments = await this.findPaymentsByClientIdAndManagerId(
      clientId,
      managerId,
    );

    const totalAmount: number = payments.reduce(
      (total, payment) => total + Number(payment.amount),
      0,
    );

    return totalAmount;
  }

  async findPaymentsByClientIdAndManagerId(
    clientId: string,
    managerId: string,
  ): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: {
        clientId,
        managerId,
      },
    });
  }
}
