import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // POST /users
  @Post()
  create(@Body() createUserDto: CreateUserDto): void {
    return this.usersService.create(createUserDto);
  }

  // GET /users?limit=2
  @Get()
  findAll(@Query() limit: number): Promise<User[]> {
    return this.usersService.findAll(limit);
  }

  // GET /users/123
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
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
