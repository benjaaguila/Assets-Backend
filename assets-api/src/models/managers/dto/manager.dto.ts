import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateManagerDto {
  @ApiProperty({
    description: 'Nombre del gestor',
    example: 'ASTRID NOVA',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Tiene que ingresar un nombre del gestor',
  })
  name: string;
}

export class ManagerDto {
  @Expose()
  managerId: string;

  @Expose()
  name: string;
}

export class UpdateManagerDto extends PartialType(CreateManagerDto) {
  @IsOptional()
  @IsString()
  name: string;
}
