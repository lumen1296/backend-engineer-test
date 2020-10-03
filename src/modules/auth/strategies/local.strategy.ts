import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from '@DTO/User.dto';
import { AuthService } from '../services/auth/auth.service';

 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }
  async validate(email: string, password: string): Promise<UserDTO> {
    const user = this.authService.validateUser(email, password);

    if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    }
  }
