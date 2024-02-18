import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { SignUpUserDto, SignCredential } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
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
    const user = await this.authRepository.findOne({
      where: { password: userInfo.password },
    });
    const match = await bcrypt.compare(userInfo.password, user.password);
    console.log('🚀 ~ AuthService ~ signIn ~ match:', match);
    if (user?.password !== match) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    const secret = this.config.get('TOKEN_SECRET');
    console.log(process.env.TOKEN_SECRET);
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
