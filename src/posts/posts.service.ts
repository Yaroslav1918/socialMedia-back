import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map } from 'rxjs';

import { PostDto } from './dto/post.dto';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  findPosts(take: number = 10, skip: number = 0): Observable<PostDto[]> {
    return from(
      this.postsRepository
        .findAndCount({
          take,
          skip,
          order: { createdAt: 'DESC' },
          relations: ['author'],
        })
        .then(([posts, count]: [PostDto[], number]) => ({ posts, count })),
    ).pipe(
      map(({ posts }: { posts: PostDto[]; count: number }) => {
        return posts.map((post) => {
          const { password, ...authorData } = post.author;
          return {
            ...post,
            author: authorData,
          };
        });
      }),
    );
  }

  create(post: PostDto, user: User): Observable<PostDto> {
    post.author = user;
    return from(this.postsRepository.save(post));
  }

  findOne(id: number): Observable<PostDto> {
    return from(
      this.postsRepository.findOne({
        where: {
          id,
        },
        relations: ['author'],
      }),
    );
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.postsRepository.delete(id));
  }

  update(id: number, bodyPost: PostDto): Observable<UpdateResult> {
    return from(this.postsRepository.update(id, bodyPost));
  }

  getPosts(
    userId: number,
    take: number = 10,
    skip: number = 0,
  ): Observable<PostDto[]> {
    return from(
      this.postsRepository
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.author', 'author')
        .orderBy('post.createdAt', 'DESC')
        .take(take)
        .skip(skip)
        .getMany(),
    );
  }
}
