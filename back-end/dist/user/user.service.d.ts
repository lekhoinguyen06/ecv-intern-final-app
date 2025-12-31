import { User } from './interfaces/user.interface';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { LogService } from 'src/log/log.service';
export declare class UserService {
    private usersRepository;
    private logService;
    constructor(usersRepository: Repository<User>, logService: LogService);
    create(user: CreateUserDto): Promise<void>;
    findOne(email: string): Promise<User | undefined>;
    update(user: UpdateUserDto): Promise<void>;
    remove(email: string): Promise<void>;
}
