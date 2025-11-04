import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConsultsService {
  constructor(private prisma: PrismaService) {}

  async requestConsult(doctorId: string, patientId: string, scheduledAt: Date | null, priceCents: number) {
    const consult = await this.prisma.consult.create({ data: { doctorId, patientId, scheduledAt, priceCents, currency: 'INR' } });
    return consult;
  }

  async listForDoctor(doctorId: string) {
    return this.prisma.consult.findMany({ where: { doctorId } });
  }

  async completeConsult(consultId: string) {
    return this.prisma.consult.update({ where: { id: consultId }, data: { status: 'COMPLETED', endedAt: new Date() } });
  }
}
