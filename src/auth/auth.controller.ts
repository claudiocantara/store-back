import { RefreshJwtGuard } from './guards/refresh.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() userCreateDto: CreateUserDto) {
    return await this.userService.create(userCreateDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: LoginDto) {
    return await this.authService.login(userLoginDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() request) {
    return await this.authService.refreshTokens(request);
  }
}
