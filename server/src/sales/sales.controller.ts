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
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: any,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ningún archivo');
    }
    return this.salesService.uploadFromCsv(file.buffer, user.userId);
  }

  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.salesService.findAll(user.userId, user.role);
  }

  @Get('stats')
  async getStats(@CurrentUser() user: any) {
    return this.salesService.getStats(user.userId, user.role);
  }

  @Get('analytics')
  async getAnalytics(@CurrentUser() user: any) {
    return this.salesService.getAnalytics(user.userId, user.role);
  }

  @Get('forecast')
  async getForecast(@CurrentUser() user: any) {
    return this.salesService.getForecast(user.userId, user.role);
  }

  @Post()
  @Roles('admin')
  async create(
    @Body(ValidationPipe) createSaleDto: CreateSaleDto,
    @CurrentUser() user: any,
  ) {
    return this.salesService.create(createSaleDto, user.userId);
  }
}
