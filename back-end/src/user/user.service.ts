import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
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
    if (!existingUser)
      throw new NotFoundException(`Cannot find user with email: ${email}`);
    this.logService.info(`Found user with email: ${email}`);
    return existingUser;
  }

  // Check email

  // Update
  async update(user: UpdateUserDto): Promise<void> {
    const existingUser = await this.findOne(user.email);
    if (!existingUser)
      throw new NotFoundException(`Cannot find user with email: ${user.email}`);
    await this.usersRepository.update(existingUser.id, user);
    this.logService.info(`Updated user with email: ${user.email}`);
  }

  // Delete.
  async remove(email: string): Promise<void> {
    const existingUser = await this.findOne(email);
    if (!existingUser)
      throw new NotFoundException(`Cannot find user with email: ${email}`);
    await this.usersRepository.delete({ email });
    this.logService.info(`Deleted user with email: ${email}`);
  }
}
