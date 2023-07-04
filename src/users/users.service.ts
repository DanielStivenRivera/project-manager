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
    const userByEmail = this.findUserByEmail(createUserDto.email);
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
    return user;
  }

  async findAll() {
    return this.userModel.find({ isActive: true }).select('-password');
  }

  findOne(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return {
      id,
      updateUserDto,
    };
  }

  softDelete(id: string) {
    return this.userModel.findByIdAndUpdate(id, { isActive: false });
  }

  async findUserByEmail(email: string) {
    return this.userModel
      .findOne({ email, isActive: true })
      .select(['password', 'isActive', 'email', '_id', 'userName']);
  }
}
