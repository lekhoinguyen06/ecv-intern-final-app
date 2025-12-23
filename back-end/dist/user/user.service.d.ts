import { User } from './interfaces/user.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    private readonly users;
    create(user: CreateUserDto): void;
    findOne(email: string): Promise<User | null>;
}
