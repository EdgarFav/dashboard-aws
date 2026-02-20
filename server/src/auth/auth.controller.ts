import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso. Retorna el token JWT.',
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
