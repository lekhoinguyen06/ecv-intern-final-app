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
import { LogService } from 'src/log/log.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<User>,
    private logService: LogService,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const userEntity = this.usersRepository.create(user);
      const savedUser = await this.usersRepository.save(userEntity);
      this.logService.info(`Created user with email: ${savedUser.id}`);
    } catch (error) {
      // Handle and return TypeORM expected errors
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(
          'Error when creating user: ' + error.message,
        );
      }

      this.logService.error('Error from user-service-create()' + error);
      throw error;
    }
  }

  async findOne(email: string): Promise<User | null> {
    try {
      const existingUser = await this.usersRepository.findOneBy({ email });
      if (existingUser) {
        return existingUser;
      } else {
        throw new BadRequestException(
          `Error when finding user: user with email ${email} does not exist`,
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logService.error('Error from user-service-findone()' + error);
      throw new InternalServerErrorException();
    }
  }

  // Update

  // Delete.
}
