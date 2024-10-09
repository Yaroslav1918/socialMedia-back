import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Active_conversation')
export class ActiveConversationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string;

  @Column()
  userId: number;

  @Column()
  conversationId: number;
}
