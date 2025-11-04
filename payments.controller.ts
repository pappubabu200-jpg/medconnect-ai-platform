import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  @Post('create-order-razorpay')
  async createOrderRazor(@Body() body: any) {
    const amount = body.amountCents || 100;
    const razor = require('./razorpay.helper').default;
    const order = await razor.orders.create({ amount: amount, currency: body.currency || 'INR', receipt: body.receipt || 'rcptid_11' });
    return { order };
  }

  constructor(private paymentsService: PaymentsService) {}

  @Post('create-intent')
  async createIntent(@Body() body: any) {
    const pi = await this.paymentsService.createPaymentIntent(body.amountCents, body.currency);
    return { clientSecret: pi.client_secret, id: pi.id };
  }
}
