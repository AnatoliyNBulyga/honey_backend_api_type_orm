import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './users.entity';
import { Repository } from 'typeorm';
import { UserNotFoundExcaption } from './excaptions/user-not-found.excaption';
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UserNotFoundExcaption(email);
    }
    return user;
  }
  async createUser(user: CreateUserDto) {
    const createdUser = await this.userRepository.create(user);
    await this.userRepository.save(createdUser);
    return createdUser;
  }
}
