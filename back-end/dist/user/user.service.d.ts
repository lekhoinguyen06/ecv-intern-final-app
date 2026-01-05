import { emailAvailableMessage, User } from './interfaces/user.interface';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { LogService } from 'src/log/log.service';
export declare class UserService {
    private userRepository;
    private logService;
    constructor(userRepository: Repository<User>, logService: LogService);
    create(user: CreateUserDto): Promise<void>;
    findOne(email: string): Promise<User | undefined>;
    checkEmail(email: string): Promise<emailAvailableMessage | undefined>;
    update(user: UpdateUserDto): Promise<User | undefined>;
    remove(email: string): Promise<void>;
}
