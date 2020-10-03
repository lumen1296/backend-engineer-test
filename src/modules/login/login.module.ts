import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { AuthModule } from '@modules/auth/auth.module';


@Module({
    imports: [AuthModule],
    controllers: [LoginController],
    providers: []
})
export class LoginModule {}
