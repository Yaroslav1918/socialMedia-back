import { ActiveConversationDto } from './../dto/active-conversation.dto';
import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { AuthGuard } from '../../auth/guards/auth.guard';
import { ChatService } from '../chat.service';
import { take, Subscription, tap, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../users/entities/user.entity';
import { MessageDto } from '../dto/message.dto';
import { MessageEntity } from '../entities/message.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}
  @WebSocketServer()
  server: Server;

  @UseGuards(AuthGuard)
  handleConnection(socket: Socket) {
    console.log('HANDLE CONNECTION');
    const jwt = socket.handshake.headers.authorization;
    if (jwt) {
      this.authService
        .getJwtUser(jwt)
        .pipe(take(1))
        .subscribe((user: User) => {
          if (!user) {
            this.handleDisconnect(socket);
          } else {
            socket.data.user = user;
            this.getConversations(socket, user.id);
          }
        });
    }
  }

  handleDisconnect(socket: Socket) {
    console.log('HANDLE DISCONNECT');
    this.chatService.leaveConversation(socket.id).pipe(take(1)).subscribe();
  }

  getConversations(socket: Socket, userId: number): Subscription {
    return this.chatService
      .getConversationsWithUsers(userId)
      .subscribe((conversations) => {
        this.server.to(socket.id).emit('conversations', conversations);
      });
  }

  @SubscribeMessage('sendMessage')
  handleMessage(socket: Socket, newMessage: MessageDto) {
    if (!newMessage.conversation) return of(null);
    const { user } = newMessage;
    if (newMessage.conversation.id) {
      this.chatService
        .sendMessage(user.id, newMessage.conversation.id, newMessage.message)
        .pipe(take(1))
        .subscribe((message: MessageDto) => {
          newMessage.id = message.id;

          this.chatService
            .getActiveUsers(newMessage.conversation.id)
            .pipe(take(1))
            .subscribe((activeConversations: ActiveConversationDto[]) => {
              activeConversations.forEach(
                (activeConversation: ActiveConversationDto) => {
                  this.server
                    .to(activeConversation.socketId)
                    .emit('newMessage', newMessage);
                },
              );
            });
        });
    }
  }

  @SubscribeMessage('joinConversation')
  joinConversation(socket: Socket, friendId: number) {
    this.chatService
      .joinConversation(friendId, socket.data.user.id, socket.id)
      .pipe(
        tap((activeConversation: ActiveConversationDto) => {
          this.chatService
            .getMessages(activeConversation.conversationId)
            .pipe(take(1))
            .subscribe((messages: MessageDto[]) => {
              this.server.to(socket.id).emit('messages', messages);
            });
        }),
      )
      .pipe(take(1))
      .subscribe();
  }

  @SubscribeMessage('createConversation')
  createConversation(socket: Socket, friend: User) {
    this.chatService
      .createConversation(socket.data.user, friend)
      .pipe(take(1))
      .subscribe(() => {
        this.getConversations(socket, socket.data.user.id);
      });
  }
  @SubscribeMessage('getMessages')
  getMessages(socket: Socket, conversationId: number) {
    this.chatService
      .getMessages(conversationId)
      .pipe(take(1))
      .subscribe((messages: MessageDto[]) => {
        this.server.to(socket.id).emit('messages', messages);
      });
  }

  @SubscribeMessage('removeMessage')
  handleRemoveMessage(socket: Socket, messageId: number) {
    this.chatService
      .removeMessage(messageId)
      .pipe(
        take(1),
        tap(() => {
          this.server.emit('messageRemoved', messageId);
        }),
      )
      .subscribe();
  }

  @SubscribeMessage('markMessagesAsRead')
  markMessagesAsRead(socket: Socket, conversationId: number) {
    const { user } = socket.data;
    this.chatService
      .markMessagesAsRead(user.id, conversationId)
      .pipe(take(1))
      .subscribe(() => {
        this.server
          .to(socket.id)
          .emit('messagesMarkedAsRead', { conversationId });
      });
  }
  @SubscribeMessage('fetchUnreadMessages')
  fetchUnreadMessages(socket: Socket) {
    const userId = socket.data.user.id;
    this.chatService
      .getUnreadMessages(userId)
      .pipe(take(1))
      .subscribe((unreadMessages: MessageEntity[]) => {
        this.server.to(socket.id).emit('unreadMessages', unreadMessages);
      });
  }

  @SubscribeMessage('getUnreadMessagesCount')
  getUnreadMessagesCount(socket: Socket) {
    const { user } = socket.data;
    this.chatService
      .getUnreadMessages(user.id)
      .pipe(take(1))
      .subscribe((count) => {
        this.server.to(socket.id).emit('unreadMessagesCount', count);
      });
  }

  @SubscribeMessage('leaveConversation')
  leaveConversation(socket: Socket) {
    this.chatService.leaveConversation(socket.id).pipe(take(1)).subscribe();
  }
}
