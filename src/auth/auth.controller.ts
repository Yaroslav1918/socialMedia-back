import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthService } from './auth.service';
import { SignUpUserDto, SignCredential } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateUserInterceptor } from '../shared/interceptors';
import { FirebaseService } from '../shared/firebase/firebase.service';

@Controller('auth')
@UseInterceptors(CreateUserInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  async signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() userInfo: SignUpUserDto,
  ): Promise<User> {
    if (!file) {
      throw new BadRequestException(
        'PNG, JPEG, and JPG types are allowed only.',
      );
    }
    const imageUrl = await this.firebaseService.uploadFile(file);
    const updatedUserInfo: SignUpUserDto = {
      ...userInfo,
      imagePath: imageUrl,
    };
    const newUser = await this.authService.signUp(updatedUserInfo);
    return newUser;
  }

  @Post('login')
  login(@Body() dto: SignCredential) {
    return this.authService.signIn(dto);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
