import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [UserModule, PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                },
            }),
        }),],
    providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
    exports: [AuthService]
})
export class AuthModule { }
