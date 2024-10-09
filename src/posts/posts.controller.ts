import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Request,
  Delete,
  Param,
  Get,
  Query,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { IsCreatorGuard } from './guards/is-creator.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Observable } from 'rxjs';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createPost(@Body() dto: PostDto, @Request() req): Observable<PostDto> {
    return this.postsService.create(dto, req.user);
  }

  @UseGuards(AuthGuard, IsCreatorGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.postsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getPostsByFrienId(
    @Param('id') userId: number,
    @Query('take') take: number = 10,
    @Query('skip') skip: number = 0,
  ): Observable<PostDto[]> {
    take = take > 20 ? 20 : take;
    return this.postsService.getPosts(userId, take, skip);
  }

  @UseGuards(AuthGuard, IsCreatorGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() bodyPost: PostDto,
  ): Observable<UpdateResult> {
    return this.postsService.update(id, bodyPost);
  }

  @UseGuards(AuthGuard)
  @Get()
  findSelected(
    @Query('take') take: number = 1,
    @Query('skip') skip: number = 1,
  ): Observable<PostDto[]> {
    take = take > 20 ? 20 : take;
    return this.postsService.findPosts(take, skip);
  }
}
