import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  async findAll() {
    return this.salesService.findAll();
  }

  @Get('stats')
  async getStats() {
    return this.salesService.getStats();
  }

  @Post()
  @Roles('admin')
  async create(@Body(ValidationPipe) createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }
}
