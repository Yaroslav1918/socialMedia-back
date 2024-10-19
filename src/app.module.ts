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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        User,
        Post,
        FriendRequest,
        ConversationEntity,
        MessageEntity,
        ActiveConversationEntity,
      ],
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
