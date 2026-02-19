import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post('upload')
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se ha subido ningún archivo');
    }
    return this.salesService.uploadFromCsv(file.buffer);
  }

  @Get()
  async findAll() {
    return this.salesService.findAll();
  }

  @Get('stats')
  async getStats() {
    return this.salesService.getStats();
  }

  @Get('analytics')
  async getAnalytics() {
    return this.salesService.getAnalytics();
  }

  @Get('forecast')
  async getForecast() {
    return this.salesService.getForecast();
  }

  @Post()
  @Roles('admin')
  async create(@Body(ValidationPipe) createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }
}
