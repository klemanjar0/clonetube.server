import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../models/User';
import { UserCreatePayload } from './entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() payload: UserCreatePayload): Promise<User> {
    return await this.authService.create(payload);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.authService.getAll();
  }
}
