import { Controller, Post, Get, Put, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // POST /users
  @Post()
  create(@Body() createUserDto: CreateUserDto): void {
    return this.userService.create(createUserDto);
  }

  // GET /users
  @Get()
  findOne(@Body() email: string): Promise<User | null> {
    return this.userService.findOne(email);
  }

  // PUT /users
  @Put()
  update(@Body() email: string, @Body() updateUsersDto: UpdateUserDto) {
    return `This action updates a #${email} user ${JSON.stringify(updateUsersDto)}`;
  }

  // DELETE /users
  @Delete()
  remove(@Body() email: string) {
    return `This action removes a #${email} user`;
  }
}
