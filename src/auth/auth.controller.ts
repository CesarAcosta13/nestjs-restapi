import { User } from './schemas/auth.schema';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  async login(@Body() loginDto: loginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/users')
  async getAllUsers(): Promise<User[]> {
    return this.authService.findAll();
  }
}
