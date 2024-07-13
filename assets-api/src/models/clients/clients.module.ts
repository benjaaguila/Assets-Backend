import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { PaymentsModule } from '../payments/payments.module';
import { Debtor } from '../debtors/entities/debtor.entity';
import { DebtorsModule } from '../debtors/debtors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    forwardRef(() => PaymentsModule),
    forwardRef(() => DebtorsModule),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}