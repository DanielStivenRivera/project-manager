import { CreateUserDto } from '../../users/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class LoginDto {
  email?: string;
  userName?: string;
  password: string;
}

export class SignUpDto extends PartialType(CreateUserDto) {}

export class UpdatePasswordDto {
  email: string;
  password: string;
}