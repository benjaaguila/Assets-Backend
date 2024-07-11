import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Manager } from './entities/manager.entity';
import { CreateManagerDto } from './dto/manager.dto';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private ManagerRepository: Repository<Manager>,
  ) {}

  async findManagers(): Promise<Manager[]> {
    return await this.ManagerRepository.find();
  }

  async createManager(body: CreateManagerDto): Promise<Manager> {
    const newManager: Manager = this.ManagerRepository.create(body);
    return await this.ManagerRepository.save(newManager);
  }
}
