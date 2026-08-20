import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { Pubilc } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Pubilc()
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
