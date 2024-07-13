import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'GENIUS1',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Tiene que ingresar un nombre del cliente',
  })
  name: string;
}

export class ClientDto {
  @Expose()
  clientId: string;

  @Expose()
  name: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsOptional()
  @IsString()
  name: string;
}
