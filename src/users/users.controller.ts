import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Request,
  Put,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
  Query,
  Delete,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { lastValueFrom, Observable } from 'rxjs';

import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import {
  FriendRequestDto,
  FriendRequestStatus,
} from './dto/friend-request.dto';
import { UserDto } from './dto/create-user.dto';
import { FirebaseService } from '../shared/firebase/firebase.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Request() req,
    @Res() res,
  ) {
    if (!file) {
      throw new BadRequestException(
        'PNG, JPEG, and JPG types are allowed only.',
      );
    }

    try {
      const imageUrl = await this.firebaseService.uploadFile(file);
      const userId = req.user.id;
      await lastValueFrom(
        this.usersService.updateUserImageById(userId, imageUrl),
      );
      return res.status(200).json({ imageUrl });
    } catch (error) {
      throw new BadRequestException(
        'Error uploading file or updating user image',
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('image')
  findImage(
    @Request() req,
    @Query('userId') userId: number,
  ): Observable<{ imageUrl: string }> {
    const resolvedUserId = userId || req.user.id;
    return this.usersService.findImageNameByUserId(resolvedUserId);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  findUserById(@Param('userId') userStringId: string): Observable<UserDto> {
    return this.usersService.findOneById(+userStringId);
  }

  @UseGuards(AuthGuard)
  @Post('friend-request/:receiverId')
  sendFriendRequest(
    @Param('receiverId') receiverStringId: string,
    @Request() req,
  ): Observable<FriendRequestDto | { error: string }> {
    return this.usersService.sendFriendRequest(+receiverStringId, req.user);
  }

  @UseGuards(AuthGuard)
  @Get('friend-request/status/:receiverId')
  getRequestStatus(
    @Param('receiverId') receiverStringId: string,
    @Request() req,
  ): Observable<FriendRequestDto | { error: string }> {
    return this.usersService.getFriendRequestStatus(
      +receiverStringId,
      req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Put('friend-request/status/:receiverId')
  updateRequestStatus(
    @Param('receiverId') receiverStringId: string,
    @Body() statusResponse: FriendRequestStatus,
  ): Observable<FriendRequestStatus | { error: string }> {
    return this.usersService.updateRequestStatus(
      +receiverStringId,
      statusResponse.status,
    );
  }

  @UseGuards(AuthGuard)
  @Get('friend-request/received-requests')
  getFriendRequestsFromRecipients(
    @Request() req,
  ): Observable<FriendRequestStatus[]> {
    return this.usersService.getRequestsFromCurrentUser(req.user);
  }

  @UseGuards(AuthGuard)
  @Get('friends/all')
  getFriends(@Request() req): Observable<FriendRequestDto[]> {
    return this.usersService.getFriends(req.user);
  }

  @UseGuards(AuthGuard)
  @Post('search')
  searchUsersByName(@Request() req): Observable<UserDto[]> {
    return this.usersService.findUsersByName(req.body.name, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteFriendRequest(
    @Request() req,
    @Param('id') friendId: number,
  ): Observable<DeleteResult> {
    const userId = req.user.id;
    return this.usersService.deleteFriend(userId, friendId);
  }
}
