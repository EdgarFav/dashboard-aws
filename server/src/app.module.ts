import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      // host: 'localhost',
      port: 3306,
      // port: 3307,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      timezone: 'Z',
      username: 'user',
      password: 'password',
      database: 'dashboard',
    }),
    AuthModule,
    UsersModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
