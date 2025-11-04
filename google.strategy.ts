import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService){
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
      scope: ['profile', 'email']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function){
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    const providerId = profile.id;
    const user = await this.authService.createOrUpdateOAuthUser('GOOGLE', providerId, email, profile.displayName);
    done(null, user);
  }
}
