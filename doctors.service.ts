import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}
  async submitKyc(userId: string, licenseNumber: string, licenseDocUrl: string) {
    return this.prisma.doctor.upsert({
      where: { userId },
      create: { userId, licenseNumber, licenseDoc: licenseDocUrl, specialties: [], verified: false },
      update: { licenseNumber, licenseDoc: licenseDocUrl, kycStatus: 'PENDING' },
    });
  }
  async listPending() {
    return this.prisma.doctor.findMany({ where: { kycStatus: 'PENDING' } });
  }
  async setKycStatus(doctorId: string, status: string) {
    return this.prisma.doctor.update({ where: { id: doctorId }, data: { kycStatus: status } });
  }
}
