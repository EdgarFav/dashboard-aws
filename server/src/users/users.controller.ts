import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  ConflictException,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles('admin')
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }
    return this.usersService.create(
      createUserDto.email,
      createUserDto.password,
      createUserDto.role,
    );
  }

  @Get()
  @Roles('admin')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(+id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(+id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return updatedUser;
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findById(+id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return this.usersService.remove(+id);
  }
}
