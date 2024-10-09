import { UserDto } from '../../users/dto/create-user.dto';
import { ConversationDto } from './conversation.dto';

export class MessageDto {
  id: number;
  user: UserDto;
  conversation: ConversationDto;
  createdDate: Date;
  read: boolean;
  message: string;
}
