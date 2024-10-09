import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { FriendRequest } from './users/entities/friend-request.entity';
import { ChatModule } from './chat/chat.module';
import { ConversationEntity } from './chat/entities/conversation.entity';
import { MessageEntity } from './chat/entities/message.entity';
import { ActiveConversationEntity } from './chat/entities/active-conversation';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'social-media',
      entities: [
        User,
        Post,
        FriendRequest,
        ConversationEntity,
        MessageEntity,
        ActiveConversationEntity,
      ],
      synchronize: true,
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
