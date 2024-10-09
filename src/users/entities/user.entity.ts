import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { Role } from '../dto/role.dto';
import { Post } from '../../posts/entities/post.entity';
import { FriendRequest } from './friend-request.entity';
import { ConversationEntity } from '../../chat/entities/conversation.entity';
import { MessageEntity } from '../../chat/entities/message.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  imagePath: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Post, (Post) => Post.author)
  posts: Post[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.creator)
  sentFriendRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  receivedFriendRequests: FriendRequest[];

  @ManyToMany(
    () => ConversationEntity,
    (conversationEntity) => conversationEntity.users,
  )
  conversations: ConversationEntity[];

  @ManyToOne(() => MessageEntity, (messageEntity) => messageEntity.user)
  messages: MessageEntity[];

  conversation: ConversationEntity;
}
