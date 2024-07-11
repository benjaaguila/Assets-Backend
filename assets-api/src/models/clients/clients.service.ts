import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private ClientRepository: Repository<Client>,
  ) {}

  async findClients(): Promise<Client[]> {
    return await this.ClientRepository.find();
  }

  async createClient(body: CreateClientDto): Promise<Client> {
    const newClient: Client = this.ClientRepository.create(body);
    return await this.ClientRepository.save(newClient);
  }
}
