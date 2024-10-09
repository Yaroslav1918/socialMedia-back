import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ChatGateway } from './gateway/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entities/conversation.entity';
import { MessageEntity } from './entities/message.entity';
import { ActiveConversationEntity } from './entities/active-conversation';
import { ChatService } from './chat.service';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    TypeOrmModule.forFeature([
      ConversationEntity,
      MessageEntity,
      ActiveConversationEntity,
      User,
    ]),
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
