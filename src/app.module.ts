import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/login/login.module';
import { UserModule } from './modules/user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [LoginModule, UserModule, ConfigModule.forRoot(),
    TypeOrmModule. forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
      ssl:true,
      schema: process.env.DATABASE_SCHEMA
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
