import { User } from './interfaces/user.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { LoggingService } from 'src/logger/logger.service';
export declare class UserService {
    private usersRepository;
    private loggingService;
    constructor(usersRepository: Repository<User>, loggingService: LoggingService);
    create(user: CreateUserDto): Promise<void>;
    findOne(email: string): Promise<User | null>;
}
