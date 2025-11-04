import { Controller, Get, Req, UseGuards, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

@Get('linkedin')
@UseGuards(AuthGuard('linkedin'))
linkedinAuth() {}

@Get('linkedin/callback')
@UseGuards(AuthGuard('linkedin'))
async linkedinCallback(@Req() req: any, @Res() res: Response){
  const user = req.user;
  const tokens = await this.authService.issueTokens(user);
  res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
  return res.redirect(`${process.env.CLIENT_REDIRECT_AFTER_OAUTH}?accessToken=${tokens.accessToken}`);
}

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    // simple email/password login (example)
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) return { error: 'Invalid' };
    return this.authService.login(user);
  }

  @Get('google')
  async googleRedirect() { return { url: '/auth/google' }; }

  @Get('google/callback')
  async googleCallback(@Req() req: any, @Res() res: Response){
    // handled by passport in real flow; here assume client posts provider info
    const user = await this.authService.createOrUpdateOAuthUser('GOOGLE', req.query.providerId || req.body.providerId, req.query.email || req.body.email, req.query.name || req.body.name);
    const tokens = await this.authService.issueTokens(user);
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
    return res.json({ accessToken: tokens.accessToken });
  }

  @Post('oauth/google')
  async googleAuth(@Body() body: any, @Res() res: Response) {
    // Body should contain id_token from client
    // For simplicity, assume client sends email, providerId, name
    const user = await this.authService.createOrUpdateOAuthUser('GOOGLE', body.providerId, body.email, body.name);
    return this.authService.login(user);
  }

  @Post('oauth/apple')
  async appleAuth(@Body() body: any) {
    const user = await this.authService.createOrUpdateOAuthUser('APPLE', body.providerId, body.email, body.name);
    return this.authService.login(user);
  }
}
