import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { Role } from './role.dto';
import { Post } from '../../posts/entities/post.entity';

export class UserDto {
  id?: number;
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  imagePath?: string;
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;
  role?: Role;
  posts?: Post[];
}
