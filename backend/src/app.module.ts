import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SalesDataModule } from './sales-data/sales-data.module';

@Module({
  imports: [UsersModule, SalesDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
