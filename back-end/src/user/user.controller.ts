import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserSchema,
  UpdateUserSchema,
  type CreateUserDto,
  type UpdateUserDto,
} from './dto/user.dto';
import { User, emailAvailableMessage } from './interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipe/zod.pipe';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  // POST /user
  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.create(createUserDto);
  }

  // GET /user
  @Get()
  findOne(@Query('email') email: string): Promise<User | undefined> {
    return this.userService.findOne(email);
  }

  // GET /user/check
  @Get('check')
  check(
    @Query('email') email: string,
  ): Promise<emailAvailableMessage | undefined> {
    return this.userService.checkEmail(email);
  }

  // PUT /user
  @Put()
  @UsePipes(new ZodValidationPipe(UpdateUserSchema))
  update(@Body() updateUsersDto: UpdateUserDto) {
    return this.userService.update(updateUsersDto);
  }

  // DELETE /user
  @Delete()
  remove(@Query('email') email: string): Promise<void> {
    return this.userService.remove(email);
  }
}
