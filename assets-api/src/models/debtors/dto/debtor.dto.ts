import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDebtorDto {
  @ApiProperty({
    description: 'rut del deudor',
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Tiene que ingresar un rut del deudor',
  })
  rut: string;

  @ApiProperty({
    description: 'Pagos totales del deudor',
    example: 100000,
  })
  @IsNumber()
  @IsNotEmpty({
    message: 'Tiene que ingresar un monto total',
  })
  totalPayments: number;
}

export class DebtorDto {
  @Expose()
  debtorId: string;

  @Expose()
  rut: string;

  @Expose()
  totalPayments: number;
}

export class UpdateDebtorDto extends PartialType(CreateDebtorDto) {
  @IsOptional()
  @IsNumber()
  totalPayments: number;
}
