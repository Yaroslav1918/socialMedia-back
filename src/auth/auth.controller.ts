import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, SignCredential } from './dto';
import { CreateUserInterceptor } from 'src/shared/interceptors';

@Controller('auth')
@UseInterceptors(CreateUserInterceptor)
export class AuthController {
  constructor(private readonly usersService: AuthService) {}

  @Post('register')
  register(@Body() dto: SignUpUserDto) {
    return this.usersService.signUp(dto);
  }
  @Post('login')
  login(@Body() dto: SignCredential) {
    return this.usersService.signIn(dto);
  }
}
