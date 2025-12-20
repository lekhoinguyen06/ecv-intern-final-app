import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<User>,
  ) {}

  private readonly users: User[] = [];

  create(user: CreateUserDto) {
    this.usersRepository.create(user);
  }

  findAll(limit: number): Promise<User[]> {
    return this.usersRepository.find({
      take: limit,
    });
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  // Update

  // Delete.
}
