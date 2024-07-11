import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './models/clients/clients.module';
import { Client } from './models/clients/entities/client.entity';
import { Debtor } from './models/debtors/entities/debtor.entity';
import { DebtorsModule } from './models/debtors/debtors.module';
import { Manager } from './models/managers/entities/manager.entity';
import { ManagersModule } from './models/managers/managers.module';
import { PaymentsModule } from './models/payments/payments.module';
import { Payment } from './models/payments/entities/payment.entity';
import { LoadDataService } from './load-data/load-data.service';
import { LoadDataModule } from './load-data/load-data.module';

const DB_PORT = process.env.DB_PORT || '5432';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Client, Debtor, Manager, Payment], // add entities here
      synchronize: true,
    }),
    ClientsModule,
    DebtorsModule,
    ManagersModule,
    PaymentsModule,
    LoadDataModule,
    // add other modules here
  ],
  controllers: [],
  providers: [LoadDataService],
})
export class AppModule {}
