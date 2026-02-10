import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RegisterDto } from '../auth/dto/register.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles('admin')
  async create(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.usersService.create(registerDto.email, registerDto.password);
  }

  @Get()
  @Roles('admin')
  async findAll() {
    return this.usersService.findAll();
  }
}
