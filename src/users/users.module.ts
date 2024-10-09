import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { FriendRequest } from './entities/friend-request.entity';
import { Post } from '../posts/entities/post.entity';
import { FirebaseService } from '../shared/firebase/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, FriendRequest]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService, FirebaseService],
  exports: [UsersService],
})
export class UsersModule {}
