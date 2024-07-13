import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  Patch,
  Param,
} from '@nestjs/common';
import { DebtorsService } from './debtors.service';
import { CreateDebtorDto, UpdateDebtorDto } from './dto/debtor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('debtors')
@Controller('debtors')
export class DebtorsController {
  constructor(private readonly debtorsService: DebtorsService) {}

  @Post()
  async create(@Body() createDebtorDto: CreateDebtorDto) {
    try {
      return await this.debtorsService.createDebtor(createDebtorDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async findAll() {
    return await this.debtorsService.findDebtors();
  }

  @Patch(':rut')
  async update(
    @Param('rut') rut: string,
    @Body() updateDebtorDto: UpdateDebtorDto,
  ) {
    return await this.debtorsService.updateDebtorByRut(rut, updateDebtorDto);
  }

  @Get(':rut')
  async findOneByRut(@Param('rut') rut: string) {
    return await this.debtorsService.findOneDebtorByRut(rut);
  }
}
