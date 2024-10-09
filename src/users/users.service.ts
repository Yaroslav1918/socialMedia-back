import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from, map, of, switchMap, throwError } from 'rxjs';

import { User } from './entities/user.entity';
import {
  FriendRequestDto,
  FriendRequestStatus,
  FriendRequest_Status,
} from './dto/friend-request.dto';
import { FriendRequest } from './entities/friend-request.entity';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
  ) {}

  findAll(): Observable<UserDto[]> {
    return from(this.usersRepository.find());
  }

  findUsersByName(name: string, currentUserId: number): Observable<User[]> {
    return from(
      this.usersRepository
        .createQueryBuilder('user')
        .where('user.lastName ILIKE :name', { name: `%${name}%` })
        .orWhere('user.firstName ILIKE :name', { name: `%${name}%` })
        .andWhere('user.id != :currentUserId', { currentUserId })
        .getMany(),
    );
  }

  findOneById(id: number): Observable<UserDto> {
    return from(
      this.usersRepository.findOne({
        where: {
          id,
        },
      }),
    ).pipe(
      map((user: UserDto) => {
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        delete user.password;
        return user;
      }),
    );
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.usersRepository.delete(id));
  }

  hasRequestBeenSentOrReceived(
    creator: UserDto,
    receiver: UserDto,
  ): Observable<FriendRequestDto[]> {
    return from(
      this.friendRequestRepository.find({
        where: [
          {
            creator: { id: creator.id },
            receiver: { id: receiver.id },
          },
          {
            creator: { id: receiver.id },
            receiver: { id: creator.id },
          },
        ],
      }),
    ).pipe(
      map((friendRequests: FriendRequest[]) =>
        friendRequests.map((request) => ({
          id: request.id,
          status: request.status as FriendRequest_Status,
        })),
      ),
    );
  }
  sendFriendRequest(
    receiverId: number,
    creator: UserDto,
  ): Observable<FriendRequestDto | { error: string }> {
    if (receiverId === creator.id) {
      return throwError(
        () =>
          new HttpException(
            'It is not possible to add yourself!',
            HttpStatus.BAD_REQUEST,
          ),
      );
    }
    return this.findOneById(receiverId).pipe(
      switchMap((receiver: UserDto) => {
        return this.hasRequestBeenSentOrReceived(creator, receiver).pipe(
          switchMap((requests) => {
            const pendingRequest = requests.find(
              (req) => req.status === 'pending',
            );
            if (pendingRequest) {
              return throwError(
                () =>
                  new HttpException(
                    'A friend request has already been sent or received!',
                    HttpStatus.BAD_REQUEST,
                  ),
              );
            }
            const acceptedRequest = requests.find(
              (req) => req.status === 'accepted',
            );
            if (acceptedRequest) {
              return throwError(
                () =>
                  new HttpException(
                    'User is already your friend!',
                    HttpStatus.BAD_REQUEST,
                  ),
              );
            }
            const friendRequest: FriendRequestDto = {
              creator,
              receiver,
              status: 'pending',
            };
            return from(this.friendRequestRepository.save(friendRequest));
          }),
        );
      }),
    );
  }

  getFriendRequestStatus(
    receiverId: number,
    currentUser: User,
  ): Observable<FriendRequestStatus | { error: string }> {
    return from(this.findOneById(receiverId)).pipe(
      switchMap((receiver: User) => {
        return from(
          this.friendRequestRepository.findOne({
            where: [{ creator: currentUser, receiver }],
          }),
        );
      }),
      switchMap((friendRequest: FriendRequestDto) => {
        if (!friendRequest) {
          throw new HttpException(
            'Request status not found',
            HttpStatus.NOT_FOUND,
          );
        }
        return of({ status: friendRequest.status });
      }),
    );
  }

  getFriendRequestUserById(
    friendRequestId: number,
  ): Observable<FriendRequestDto> {
    return from(
      this.friendRequestRepository.findOne({
        where: [{ id: friendRequestId }],
        relations: ['receiver'],
      }),
    );
  }

  updateRequestStatus(
    receiverId: number,
    updatedStatus: FriendRequest_Status,
  ): Observable<FriendRequest> {
    return from(
      this.friendRequestRepository.findOne({
        where: {
          id: receiverId,
          status: 'pending',
        },
        relations: ['receiver'],
      }),
    ).pipe(
      switchMap((friendRequest: FriendRequest | undefined) => {
        if (!friendRequest) {
          throw new NotFoundException('Friend request not found');
        }
        friendRequest.status = updatedStatus;
        return from(this.friendRequestRepository.save(friendRequest));
      }),
    );
  }

  getRequestsFromCurrentUser(currentUser: User): Observable<FriendRequest[]> {
    return from(
      this.friendRequestRepository.find({
        where: [{ receiver: currentUser }, { creator: currentUser }],
        relations: ['creator', 'receiver'],
      }),
    );
  }

  updateUserImageById(id: number, imagePath: string): Observable<UpdateResult> {
    return from(
      this.usersRepository.findOne({
        where: {
          id,
        },
      }),
    ).pipe(
      switchMap((user: User | null) => {
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        user.imagePath = imagePath;
        return from(this.usersRepository.update(id, user));
      }),
    );
  }

  findImageNameByUserId(id: number): Observable<{ imageUrl: string }> {
    return from(this.findOneById(id)).pipe(
      map((user: User) => {
        return { imageUrl: user.imagePath };
      }),
    );
  }

  getFriends(currentUser: User): Observable<UserDto[]> {
    return from(
      this.friendRequestRepository.find({
        where: [
          { creator: currentUser, status: 'accepted' },
          { receiver: currentUser, status: 'accepted' },
        ],
        relations: ['creator', 'receiver'],
      }),
    ).pipe(
      map((friends: FriendRequest[]) => {
        return friends.map((friend) => {
          const user =
            friend.creator.id === currentUser.id
              ? friend.receiver
              : friend.creator;
          const { password, ...userData } = user;
          return userData;
        });
      }),
    );
  }

  deleteFriend(userId: number, friendId: number): Observable<DeleteResult> {
    return from(
      this.friendRequestRepository.findOne({
        where: [
          {
            creator: { id: userId },
            receiver: { id: friendId },
            status: 'accepted',
          },
          {
            creator: { id: friendId },
            receiver: { id: userId },
            status: 'accepted',
          },
        ],
      }),
    ).pipe(
      switchMap((friendRequest) => {
        if (!friendRequest) {
          throw new NotFoundException(
            'Friend request not found or not accepted',
          );
        }
        return from(this.friendRequestRepository.delete(friendRequest.id));
      }),
    );
  }
}
