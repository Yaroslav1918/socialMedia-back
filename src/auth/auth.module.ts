import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './guards/jwt.strategy';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { FirebaseService } from '../shared/firebase/firebase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '3600' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AuthGuard,
    RolesGuard,
    FirebaseService,
  ],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
