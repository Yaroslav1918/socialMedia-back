import { UserDto } from '../../users/dto/create-user.dto';

export class ConversationDto {
  id?: number;
  users?: UserDto[];
  lastUpdated?: Date;
}
