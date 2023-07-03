import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userByEmail = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (userByEmail) {
      throw new HttpException('email already registered', HttpStatus.CONFLICT);
    }
    const userByUserName = await this.userRepository.findOneBy({
      userName: createUserDto.userName,
    });
    if (userByUserName)
      throw new HttpException(
        'user name already registered',
        HttpStatus.CONFLICT,
      );
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    console.log(users);
    return users;
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
