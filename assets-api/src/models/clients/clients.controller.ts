import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/client.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      return await this.clientsService.createClient(createClientDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async findAll() {
    return await this.clientsService.findClients();
  }

  @Get(':name')
  async findOneByName(@Param('name') name: string) {
    return await this.clientsService.findOneClientByName(name);
  }
}
