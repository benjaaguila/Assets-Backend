import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Debtor } from './entities/debtor.entity';
import { CreateDebtorDto } from './dto/debtor.dto';

@Injectable()
export class DebtorsService {
  constructor(
    @InjectRepository(Debtor)
    private DebtorRepository: Repository<Debtor>,
  ) {}

  async findDebtors(): Promise<Debtor[]> {
    return await this.DebtorRepository.find();
  }

  async createDebtor(body: CreateDebtorDto): Promise<Debtor> {
    const newDebtor: Debtor = this.DebtorRepository.create(body);
    return await this.DebtorRepository.save(newDebtor);
  }
}
