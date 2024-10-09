import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';

import { SignUpUserDto, SignCredential } from './dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(userInfo: SignUpUserDto): Promise<User> {
    const hash = bcrypt.hashSync(userInfo.password, 10);
    const newUser = this.authRepository.create({
      ...userInfo,
      password: hash,
    });
    await this.authRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async signIn(userInfo: SignCredential): Promise<{ access_token: string }> {
    const { email, password } = userInfo;
    const user = await this.authRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const match = await bcrypt.compare(password, user?.password);
    if (!match) {
      throw new UnauthorizedException('Email or password is not valid');
    }
    const { password: userPassword, ...payload } = user;
    const secret = this.config.get('TOKEN_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret,
    });
    return {
      access_token: token,
    };
  }

  validateUser(id: number, pass: string): Observable<User | null> {
    return from(
      this.usersService.findOneById(id).pipe(
        switchMap((user: User | null) => {
          if (user) {
            return from(bcrypt.compare(pass, user.password)).pipe(
              map((isValidPassword: boolean) => {
                if (isValidPassword) {
                  delete user.password;
                  return user;
                } else {
                  return null;
                }
              }),
            );
          } else {
            return [null];
          }
        }),
      ),
    );
  }

  getJwtUser(jwt: string): Observable<User | null> {
    return from(
      this.jwtService.verifyAsync(jwt, {
        secret: process.env.TOKEN_SECRET,
      }),
    ).pipe(
      map((user: User) => {
        return user;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }
}
