import { UserDto } from '../../users/dto/create-user.dto';

export interface PostDto {
  id?: number;
  body?: string;
  createdAt?: Date;
  author?: UserDto;
}
