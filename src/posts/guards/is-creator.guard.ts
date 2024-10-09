import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Post } from '../entities/post.entity';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { PostsService } from '../posts.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private postService: PostsService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: User; params: { id: number } } = request;
    if (!user || !params) return false;
    if (user.role === 'admin') return true;
    const feedId = params.id;
    return this.userService.findOneById(user.id).pipe(
      switchMap((user: User) =>
        this.postService.findOne(feedId).pipe(
          map((feedPost: Post) => {
            return user.id === feedPost.author.id;
          }),
        ),
      ),
    );
  }
}
