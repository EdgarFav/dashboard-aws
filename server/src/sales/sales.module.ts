import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  providers: [SalesService],
  controllers: [SalesController],
  exports: [SalesService],
})
export class SalesModule {}
