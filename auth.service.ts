import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }

  async createOrUpdateOAuthUser(provider: string, providerId: string, email: string, name?: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await this.prisma.user.create({ data: { email, name, oauthSub: providerId, oauthProvider: provider } });
    } else {
      user = await this.prisma.user.update({ where: { email }, data: { oauthSub: providerId, oauthProvider: provider, name } });
    }
    return user;
  }
}


async findUserById(id: string){
  return this.prisma.user.findUnique({ where: { id } });
}

async issueTokens(user: any){
  const accessToken = this.jwt.sign({ sub: user.id, email: user.email, role: user.role }, { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' });
  const refresh = await this.prisma.refreshToken.create({ data: { userId: user.id, token: require('crypto').randomBytes(48).toString('hex'), expiresAt: new Date(Date.now() + 7*24*60*60*1000) } });
  return { accessToken, refreshToken: refresh.token };
}
