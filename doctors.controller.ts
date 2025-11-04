import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Post('kyc')
  async submitKyc(@Body() body: any) {
    return this.doctorsService.submitKyc(body.userId, body.licenseNumber, body.licenseDocUrl);
  }

  @Get('pending')
  async pending() {
    return this.doctorsService.listPending();
  }

  @Post(':id/status')
  async setStatus(@Param('id') id: string, @Body() body: any) {
    return this.doctorsService.setKycStatus(id, body.status);
  }
}
