import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../users/schema/user.schema';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CompareHash } from '../shared/encrypt-utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('wrong email/password');
    }
    if (!(await CompareHash(pass, user.password))) {
      throw new UnauthorizedException('wrong email/password');
    }
    const payload = { sub: user._id, userName: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if (!user) {
      throw new UnauthorizedException('unauthorized');
    }
    return this.login(user.email, user.password);
  }
}
