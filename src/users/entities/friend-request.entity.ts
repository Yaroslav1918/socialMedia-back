import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { FriendRequest_Status } from '../dto/friend-request.dto';

@Entity('Request')
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentFriendRequests, { eager: true })
  creator: User;

  @ManyToOne(() => User, (user) => user.receivedFriendRequests, { eager: true })
  receiver: User;

  @Column()
  status: FriendRequest_Status;
}
