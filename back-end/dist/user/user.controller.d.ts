import { UserService } from './user.service';
import { type CreateUserDto, type UpdateUserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<void>;
    findOne(email: string): Promise<User | undefined>;
    update(updateUsersDto: UpdateUserDto): string;
    remove(deleteUserDto: DeleteUserDto): Promise<void>;
}
