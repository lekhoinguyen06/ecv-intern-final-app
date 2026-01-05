import { UserService } from './user.service';
import { type CreateUserDto, type UpdateUserDto } from './dto/user.dto';
import { User, emailAvailableMessage } from './interfaces/user.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<void>;
    findOne(email: string): Promise<User | undefined>;
    check(email: string): Promise<emailAvailableMessage | undefined>;
    update(updateUsersDto: UpdateUserDto): Promise<User | undefined>;
    remove(email: string): Promise<void>;
}
