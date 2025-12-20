import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
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

  // GET /users/123
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  // PUT /users/123
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUsersDto: UpdateUserDto) {
    return `This action updates a #${id} user ${JSON.stringify(updateUsersDto)}`;
  }

  // DELETE /users/123
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
