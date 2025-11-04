import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-06' });
  }

  async createPaymentIntent(amountCents: number, currency = 'INR') {
    return this.stripe.paymentIntents.create({ amount: amountCents, currency, automatic_payment_methods: { enabled: true } });
  }
}
