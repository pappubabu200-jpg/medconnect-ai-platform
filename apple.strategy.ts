import { PassportStrategy } from '@nestjs/passport';
import { Strategy as AppleStrategy } from 'passport-apple';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AppleAuthStrategy extends PassportStrategy(AppleStrategy, 'apple'){
  constructor(private authService: AuthService){
    super({
      clientID: process.env.APPLE_CLIENT_ID || '',
      teamID: process.env.APPLE_TEAM_ID || '',
      keyID: process.env.APPLE_KEY_ID || '',
      privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH || ''
    });
  }

  async validate(accessToken: any, refreshToken: any, idToken: any, profile: any, done: Function){
    // profile may be undefined; parse idToken if needed
    const email = profile && profile.email ? profile.email : (idToken && idToken.email);
    const providerId = (profile && profile.id) || (idToken && idToken.sub);
    const user = await this.authService.createOrUpdateOAuthUser('APPLE', providerId, email);
    done(null, user);
  }
}
