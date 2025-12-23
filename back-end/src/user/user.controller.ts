import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserSchema,
  type CreateUserDto,
  type UpdateUserDto,
} from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipe/zod.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // POST /users
  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.create(createUserDto);
  }

  // GET /users
  @Get()
  findOne(@Body('email') email: string): Promise<User | null> {
    return this.userService.findOne(email);
  }

  // PUT /users
  @Put()
  update(@Body() updateUsersDto: UpdateUserDto) {
    return `This action updates a #${updateUsersDto.email} user ${JSON.stringify(updateUsersDto)}`;
  }

  // DELETE /users
  @Delete()
  remove(@Body('email') email: string) {
    return `This action removes a #${email} user`;
  }
}
