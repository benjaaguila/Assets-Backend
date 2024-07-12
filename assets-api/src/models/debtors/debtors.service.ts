import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debtor } from './entities/debtor.entity';
import { CreateDebtorDto, UpdateDebtorDto } from './dto/debtor.dto';

@Injectable()
export class DebtorsService {
  constructor(
    @InjectRepository(Debtor)
    private debtorRepository: Repository<Debtor>,
  ) {}

  async findDebtors(): Promise<Debtor[]> {
    return await this.debtorRepository.find();
  }

  async findOneDebtor(debtorId: string): Promise<Debtor> {
    const debtor = await this.debtorRepository.findOne({ where: { debtorId } });
    
    if (!debtor) {
      throw new NotFoundException(`El deudor con ID '${debtorId}' no existe.`);
    }
    
    return debtor;
  }

  async findOneDebtorByRut(rut: string): Promise<Debtor> {
    const debtor = await this.debtorRepository.findOne({ where: { rut } });
    
    if (!debtor) {
      throw new NotFoundException(`El deudor con RUT '${rut}' no existe.`);
    }
    
    return debtor;
  }

  async createDebtor(createDebtorDto: CreateDebtorDto): Promise<Debtor> {
    try {
      const newDebtor = this.debtorRepository.create(createDebtorDto);
      return await this.debtorRepository.save(newDebtor);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`El deudor con RUT '${createDebtorDto.rut}' ya existe.`);
      }
      throw error;
    }
  }

  async updateDebtorByRut(rut: string, updateDebtorDto: UpdateDebtorDto): Promise<Debtor> {
    const debtor = await this.findOneDebtorByRut(rut);
    
    return await this.debtorRepository.save({
      ...debtor,
      ...updateDebtorDto,
    });
  }
}
