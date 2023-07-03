import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from '../shared/encrypt-utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto) {
    const userByEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    console.log(userByEmail);
    if (userByEmail)
      throw new HttpException('email already registered', HttpStatus.CONFLICT);
    const userByNickName = await this.userModel.findOne({
      userName: createUserDto.userName,
    });
    if (userByNickName)
      throw new HttpException(
        'userName already registered',
        HttpStatus.CONFLICT,
      );
    createUserDto.password = await hashPassword(createUserDto.password);
    const user = await this.userModel.create(createUserDto);
    await user.save();
  }

  async findAll() {
    return this.userModel.find().select('-password');
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {}

  softDelete(id: string) {
    return this.userModel.findByIdAndUpdate(id, { isActive: false });
  }
}
