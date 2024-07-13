import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, getRepository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/client.dto';
import { PaymentsService } from '../payments/payments.service';
import { DebtorsService } from '../debtors/debtors.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private paymentsService: PaymentsService,
    private debtorsService: DebtorsService
  ) {}

  
async findClients(): Promise<Client[]> {
    const clients = await this.clientRepository.find();
    
    const clientsWithDebtorIds = await Promise.all(
        clients.map(async (client) => {
            const payments = await this.paymentsService.findPaymentsByClientId(client.clientId);
            const debtorIds = [...new Set(payments.map((payment) => payment.debtorId))];
            const totalPaymentsRecibedFromDebtors = await this.debtorsService.getTotalPaymentsRecibedFromDebtors(debtorIds);

            return {
                ...client,
                totalPaymentsRecibedFromDebtors,
            };
        })
    );

    return clientsWithDebtorIds;
}

  async findOneClient(clientId: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { clientId } });
    if (!client) {
      throw new ConflictException(`El cliente con ID '${clientId}' no existe.`);
    }
    return client;
  }

  async findOneClientByName(name: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { name } });
    if (!client) {
      throw new ConflictException(`El cliente con nombre '${name}' no existe.`);
    }
    return client;
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const newClient = this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(newClient);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `El cliente con nombre '${createClientDto.name}' ya existe.`,
        );
      }
      throw error;
    }
  }
}
