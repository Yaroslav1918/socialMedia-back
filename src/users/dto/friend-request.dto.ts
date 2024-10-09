import { UserDto } from './create-user.dto';

export type FriendRequest_Status = 'pending' | 'accepted' | 'declined';

export interface FriendRequestStatus {
  status?: FriendRequest_Status;
}

export interface FriendRequestDto {
  id?: number;
  creator?: UserDto;
  receiver?: UserDto;
  status?: FriendRequest_Status;
}
