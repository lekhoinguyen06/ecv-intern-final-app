import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { LogService } from 'src/log/log.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<User>,
    private logService: LogService,
  ) {}

  async create(user: CreateUserDto) {
    const userEntity = this.usersRepository.create(user);
    const savedUser = await this.usersRepository.save(userEntity);
    this.logService.info(`Created user with email: ${savedUser.id}`);
  }

  async findOne(email: string): Promise<User | undefined> {
    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      return existingUser;
    } else {
      throw new NotFoundException('Cannot find user');
    }
  }

  // Update

  // Delete.
}
