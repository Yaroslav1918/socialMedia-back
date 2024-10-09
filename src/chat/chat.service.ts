import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map, mergeMap, of, switchMap } from 'rxjs';

import { MessageEntity } from './entities/message.entity';
import { ConversationEntity } from './entities/conversation.entity';
import { ActiveConversationEntity } from './entities/active-conversation';
import { User } from '../users/entities/user.entity';
import { ConversationDto } from './dto/conversation.dto';
import { ActiveConversationDto } from './dto/active-conversation.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageEntity: Repository<MessageEntity>,
    @InjectRepository(ConversationEntity)
    private readonly conversationEntity: Repository<ConversationEntity>,
    @InjectRepository(ActiveConversationEntity)
    private readonly activeConversationEntity: Repository<ActiveConversationEntity>,
  ) {}

  sendMessage(
    userId: number,
    conversationId: number,
    message: string,
  ): Observable<MessageEntity> {
    const newMessage = this.messageEntity.create({
      user: { id: userId },
      conversation: { id: conversationId },
      message,
    });
    return from(this.messageEntity.save(newMessage)).pipe(
      map((message) => {
        this.conversationEntity.update(conversationId, {
          lastUpdated: new Date(),
        });
        return message;
      }),
    );
  }

  getConversationMessages(conversationId: number): Observable<MessageEntity[]> {
    return from(
      this.messageEntity.find({
        where: { conversation: { id: conversationId } },
        relations: ['user'],
        order: { createdDate: 'ASC' },
      }),
    );
  }

  createConversation(creator: User, friend: User): Observable<ConversationDto> {
    return this.getConversation(creator.id, friend.id).pipe(
      switchMap((conversation: ConversationDto) => {
        const doesConversationExist = !!conversation;
        if (!doesConversationExist) {
          const newConversation: ConversationDto = {
            users: [creator, friend],
          };
          return from(this.conversationEntity.save(newConversation));
        }
        return of(conversation);
      }),
    );
  }

  getConversationsWithUsers(userId: number) {
    return from(
      this.conversationEntity
        .createQueryBuilder('conversation')
        .leftJoin('conversation.users', 'user')
        .where('user.id = :userId', { userId })
        .orderBy('conversation.lastUpdated', 'DESC')
        .getMany(),
    ).pipe(
      switchMap((conversations: ConversationDto[]) =>
        from(conversations).pipe(
          mergeMap((conversation: ConversationDto) =>
            from(
              this.conversationEntity
                .createQueryBuilder('conversation')
                .innerJoinAndSelect('conversation.users', 'user')
                .where('conversation.id = :id', { id: conversation.id })
                .getMany(),
            ),
          ),
        ),
      ),
    );
  }

  createMessage(message: MessageDto): Observable<MessageDto> {
    return from(this.messageEntity.save(message));
  }

  removeMessage(messageId: number): Observable<DeleteResult> {
    return from(this.messageEntity.delete(messageId));
  }

  getActiveUsers(conversationId: number): Observable<ActiveConversationDto[]> {
    return from(
      this.activeConversationEntity.find({
        where: [{ conversationId }],
      }),
    );
  }

  getConversation(
    creatorId: number,
    friendId: number,
  ): Observable<ConversationDto | undefined> {
    return from(
      this.conversationEntity
        .createQueryBuilder('conversation')
        .leftJoin('conversation.users', 'user')
        .where('user.id = :creatorId', { creatorId })
        .orWhere('user.id = :friendId', { friendId })
        .groupBy('conversation.id')
        .having('COUNT(*) > 1')
        .getOne(),
    ).pipe(map((conversation: ConversationDto) => conversation));
  }

  joinConversation(
    friendId: number,
    userId: number,
    socketId: string,
  ): Observable<ActiveConversationDto> {
    return this.getConversation(userId, friendId).pipe(
      switchMap((conversation: ConversationDto) => {
        if (!conversation) {
          return of();
        }
        const conversationId = conversation.id;
        return from(
          this.activeConversationEntity.findOne({ where: { userId } }),
        ).pipe(
          switchMap((activeConversation: ActiveConversationDto) => {
            if (activeConversation) {
              return from(
                this.activeConversationEntity.delete({ userId }),
              ).pipe(
                switchMap(() => {
                  return from(
                    this.activeConversationEntity.save({
                      socketId,
                      userId,
                      conversationId,
                    }),
                  );
                }),
              );
            } else {
              return from(
                this.activeConversationEntity.save({
                  socketId,
                  userId,
                  conversationId,
                }),
              );
            }
          }),
        );
      }),
    );
  }

  getMessages(conversationId: number): Observable<MessageDto[]> {
    return from(
      this.messageEntity
        .createQueryBuilder('message')
        .innerJoinAndSelect('message.user', 'user')
        .where('message.conversation.id =:conversationId', { conversationId })
        .orderBy('message.createdDate', 'ASC')
        .getMany(),
    );
  }

  markMessagesAsRead(
    userId: number,
    conversationId: number,
  ): Observable<UpdateResult> {
    return from(
      this.messageEntity
        .createQueryBuilder()
        .update(MessageEntity)
        .set({ read: true })
        .where(
          'conversationId = :conversationId AND userId = :userId AND read = false',
          { conversationId, userId },
        )
        .execute(),
    );
  }

  getUnreadMessagesCount(userId: number): Observable<number> {
    return from(
      this.messageEntity.count({
        where: {
          user: { id: userId },
          read: false,
        },
      }),
    );
  }

  getUnreadMessages(userId: number): Observable<MessageEntity[]> {
    return from(
      this.messageEntity
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.conversation', 'conversation')
        .leftJoinAndSelect('conversation.users', 'user')
        .where('message.userId = :userId', { userId })
        .andWhere('message.read = false')
        .getMany(),
    );
  }

  leaveConversation(socketId: string): Observable<DeleteResult> {
    return from(this.activeConversationEntity.delete({ socketId }));
  }
}
