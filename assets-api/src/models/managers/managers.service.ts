import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';
import { CreateManagerDto } from './dto/manager.dto';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  async findManagers(): Promise<Manager[]> {
    return await this.managerRepository.find();
  }

  async findOneManager(managerId: string): Promise<Manager> {
    const manager = await this.managerRepository.findOne({ where: { managerId } });
    if (!manager) {
      throw new ConflictException(`El manager con ID '${managerId}' no existe.`);
    }
    return manager;
  }

  async findOneManagerByName(name: string): Promise<Manager> {
    const manager = await this.managerRepository.findOne({ where: { name } });
    if (!manager) {
      throw new ConflictException(`El manager con nombre '${name}' no existe.`);
    }
    return manager;
  }

  async createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
    try {
      const newManager = this.managerRepository.create(createManagerDto);
      return await this.managerRepository.save(newManager);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`El manager con nombre '${createManagerDto.name}' ya existe.`);
      }
      throw error;
    }
  }
}
