import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Post()
  createUsers(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // @Patch(':id')
  // updateUsers(
  //   @Body() dto: UpdateUserDto,
  //   @Param('id', ParseIntPipe) id: number,
  // ) {
  //   return this.usersService.update(dto, id);
  // }

  findUser(username: string) {
    return this.usersService.find(username);
  }

  @Post(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
