import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<User>,
    private loggingService: LoggingService,
  ) {}

  private readonly users: User[] = [];

  create(user: CreateUserDto) {
    this.usersRepository.create(user);
    this.loggingService.info('Created a user');
  }

  findOne(email: string): Promise<User | null> {
    this.loggingService.info('Found a user with email' + email);
    return this.usersRepository.findOneBy({ email });
  }

  // Update

  // Delete.
}
