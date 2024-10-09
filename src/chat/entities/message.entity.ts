import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';

import { ConversationEntity } from './conversation.entity';
import { User } from '../../users/entities/user.entity';

@Entity('Message')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => User, (userEntity) => userEntity.messages)
  user: User;
  @ManyToOne(
    () => ConversationEntity,
    (conversationEntity) => conversationEntity.messages,
  )
  conversation: ConversationEntity;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ default: false })
  read: boolean;
}
