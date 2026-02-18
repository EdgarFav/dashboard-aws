import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), UsersModule],
  providers: [SalesService, SeedService],
  controllers: [SalesController],
  exports: [SalesService],
})
export class SalesModule {}
