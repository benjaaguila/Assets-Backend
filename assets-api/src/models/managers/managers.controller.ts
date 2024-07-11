import { Controller, Get, Post, Body, ConflictException } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/manager.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('managers')
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  async create(@Body() createManagerDto: CreateManagerDto) {
    try {
      return await this.managersService.createManager(createManagerDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async findAll() {
    return await this.managersService.findManagers();
  }
}
