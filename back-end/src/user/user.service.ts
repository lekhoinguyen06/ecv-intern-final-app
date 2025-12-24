import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
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

  async create(user: CreateUserDto) {
    try {
      const userEntity = this.usersRepository.create(user);
      const savedUser = await this.usersRepository.save(userEntity);
      this.loggingService.info(`Created user with email: ${savedUser.id}`);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(
          'Message: ' + error.message + 'Cause: ' + error.cause,
        );
      }

      this.loggingService.error('Error when creating a user' + error);
      throw error;
    }
  }

  async findOne(email: string): Promise<User | null> {
    try {
      const existingUser = await this.usersRepository.findOneBy({ email });
      this.loggingService.info('Found a user with email' + email);
      if (existingUser) {
        return existingUser;
      } else {
        throw new BadRequestException(
          `Error when finding user: user with email ${email} does not exist`,
        );
      }
    } catch (error) {
      this.loggingService.error('Error when creating a user' + error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to find user');
    }
  }

  // Update

  // Delete.
}
