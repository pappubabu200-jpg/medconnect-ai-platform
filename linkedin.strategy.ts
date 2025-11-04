import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { AuthService } from './auth.service';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(LinkedInStrategy, 'linkedin') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
      callbackURL: process.env.LINKEDIN_CALLBACK_URL || 'https://your-domain.com/api/auth/linkedin/callback',
      scope: ['r_liteprofile', 'r_emailaddress'],
      state: true,
      passReqToCallback: true
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: Function) {
    try {
      const email = profile.emails && profile.emails[0] && profile.emails[0].value;
      const providerId = profile.id;
      const user = await this.authService.createOrUpdateOAuthUser('LINKEDIN', providerId, email, profile.displayName);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
}
