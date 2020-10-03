import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/User.entity';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { HttpModule } from '@nestjs/common/http/http.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        })
      ],
      providers: [UserService],
      controllers: [UserController],
      exports: [UserService]
})
export class UserModule {}
