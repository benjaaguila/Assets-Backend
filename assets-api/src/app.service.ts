import { Injectable } from '@nestjs/common';
import { PaymentsService } from './models/payments/payments.service';

@Injectable()
export class AppService {

  constructor(
    private PaymentsService: PaymentsService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async hasData(): Promise<boolean> {
    return await this.PaymentsService.hasPayments();
  }
}
