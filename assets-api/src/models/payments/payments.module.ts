import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { ClientsModule } from '../clients/clients.module';
import { ManagersModule } from '../managers/managers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]),
    ClientsModule,
    ManagersModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
