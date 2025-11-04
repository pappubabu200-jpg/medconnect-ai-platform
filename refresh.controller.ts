import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class RefreshController {
  constructor(private refreshService: RefreshService, private authService: AuthService) {}

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const token = body.refreshToken;
    const rec = await this.refreshService.validate(token);
    if (!rec) return { error: 'Invalid refresh token' };
    const user = await this.authService.findUserById(rec.userId);
    const tokens = await this.authService.issueTokens(user);
    // set httpOnly cookie for refresh token
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 7*24*60*60*1000 });
    return { accessToken: tokens.accessToken };
  }
}
