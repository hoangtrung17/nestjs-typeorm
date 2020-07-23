import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule,
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService]
})
export class AppModule { }
