import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DebtorsService } from './debtors.service';
import { CreateDebtorDto } from './dto/debtor.dto';
import { UpdateDebtorDto } from './dto/debtor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('debtors')
@Controller('debtors')
export class DebtorsController {
  constructor(private readonly debtorsService: DebtorsService) {}

  @Post()
  create(@Body() createDebtorDto: CreateDebtorDto) {
    return this.debtorsService.createDebtor(createDebtorDto);
  }

  @Get()
  findAll() {
    return this.debtorsService.findDebtors();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.debtorsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDebtorDto: UpdateDebtorDto) {
  //   return this.debtorsService.update(+id, updateDebtorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.debtorsService.remove(+id);
  // }
}
