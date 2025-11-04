import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomBytes } from 'crypto';
import { add } from 'date-fns';

@Injectable()
export class RefreshService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, expiresInDays = 7) {
    const token = randomBytes(48).toString('hex');
    const expiresAt = add(new Date(), { days: expiresInDays });
    await this.prisma.refreshToken.create({ data: { userId, token, expiresAt } });
    return { token, expiresAt };
  }

  async validate(token: string) {
    const rec = await this.prisma.refreshToken.findUnique({ where: { token } });
    if (!rec) return null;
    if (rec.expiresAt < new Date()) return null;
    return rec;
  }

  async revoke(token: string) {
    await this.prisma.refreshToken.deleteMany({ where: { token } });
  }
}
