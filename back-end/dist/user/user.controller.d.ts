import { UserService } from './user.service';
import { type CreateUserDto, type UpdateUserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): void;
    findOne(email: string): Promise<User | null>;
    update(email: string, updateUsersDto: UpdateUserDto): string;
    remove(email: string): string;
}
