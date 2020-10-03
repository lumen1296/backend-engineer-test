import { Injectable, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UserService } from '@modules/user/services/user/user.service';
import { UserDTO } from '@DTO/User.dto';
import { hash, compare } from 'bcrypt';
import { postgresErrorCodeEnum } from '@shared/constants/postgres/postgresErrorCode.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '@modules/auth/models/TokenPayload';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService, private readonly jwtService: JwtService,
    private readonly configService: ConfigService) { }


  public async signUpUser(userDTO: UserDTO) {
    const hashedPassword = await hash(userDTO.password, 10);
    try {
      const createdUser = await this.userService.createUSer({
        ...userDTO,
        password: hashedPassword
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === postgresErrorCodeEnum.UNIQUE_VIOLATION) {   
        throw new ConflictException;       
      }
      throw new InternalServerErrorException;

    }
  }



  async validateUser(email: string, password: string): Promise<UserDTO> {
    const user = await this.userService.getUserByEmail(email);
    await this.verifyPassword(password, user.password);
    user.password = undefined;
    return user;
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new BadRequestException;
    }
  }



}
