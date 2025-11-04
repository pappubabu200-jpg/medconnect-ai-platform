import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ConsultsService } from './consults.service';

@Controller('consults')
export class ConsultsController {
  constructor(private consultsService: ConsultsService) {}

  @Post('request')
  async request(@Body() body: any) {
    return this.consultsService.requestConsult(body.doctorId, body.patientId, body.scheduledAt ? new Date(body.scheduledAt) : null, body.priceCents || 0);
  }

  @Get('doctor/:id')
  async listForDoctor(@Param('id') id: string) {
    return this.consultsService.listForDoctor(id);
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string) {
    return this.consultsService.completeConsult(id);
  }
}
