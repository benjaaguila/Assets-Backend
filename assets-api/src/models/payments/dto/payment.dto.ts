import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID del cliente',
    example: '1',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Debe ingresar un ID de cliente',
  })
  clientId: string;

  @ApiProperty({
    description: 'ID del gestor',
    example: '123-abc@789',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Debe ingresar un ID de gestor',
  })
  managerId: string;

  @ApiProperty({
    description: 'ID del deudor',
    example: '1',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Debe ingresar un ID de deudor',
  })
  debtorId: string;

  @ApiProperty({
    description: 'Fecha del pago',
    example: '2021-10-10',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Debe ingresar una fecha de pago',
  })
  paymentDate: string;

  @ApiProperty({
    description: 'Monto del pago',
    example: '1000',
  })
  @IsNumber()
  @IsNotEmpty({
    message: 'Debe ingresar un monto de pago',
  })
  amount: number;
}

export class PaymentDto {
  @Expose()
  paymentId: string;

  @Expose()
  clientId: string;

  @Expose()
  managerId: string;

  @Expose()
  debtorId: string;

  @Expose()
  paymentDate: string;

  @Expose()
  amount: number;
}
