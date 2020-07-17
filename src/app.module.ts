import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import {UsersController} from './users/users.controller';
// import * as path from 'path';
// import { EnvConfig } from './config/config.service';
import { UsersModule } from './users/users.module';

// const mongoUrl: string = ConfigService('MONGO_URI');

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({load: [configuration]}),
    MongooseModule.forRoot('mongodb://hoangtrung17:Tony123@ds263248.mlab.com:63248/heroku_z8vp6mfc'),
    UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService]
})
export class AppModule { }
