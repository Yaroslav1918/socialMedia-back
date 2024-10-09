import {
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { MessageEntity } from './message.entity';

@Entity('Conversation')
export class ConversationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.message)
  messages: MessageEntity[];

  @UpdateDateColumn()
  lastUpdated: Date;
}
