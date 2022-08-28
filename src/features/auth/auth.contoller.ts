import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../models/User';
import { LoginPayload, UserCreatePayload } from './entities';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: UserCreatePayload): Promise<User> {
    return await this.authService.create(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginPayload): Promise<string> {
    return await this.authService.login(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.authService.getAll();
  }
}
