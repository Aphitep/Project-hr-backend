import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/interface/users.interface';

@Injectable()
export class UsersService {
  private mockUser: CreateUserDto[] = [
    { id: 1, username: 'adam', password: 'abc123', role: Role.Admin },
    { id: 2, username: 'Peter', password: 'bob123', role: Role.User },
    { id: 3, username: 'John', password: 'john123', role: Role.User },
  ];
  async findAll(): Promise<User[] | undefined> {
    if (!this.mockUser) {
      throw new NotFoundException('No users');
    }
    return this.mockUser;
  }

  create(dto: CreateUserDto) {
    this.mockUser.push(dto);
    return this.mockUser;
  }

  async find(username: string): Promise<User> {
    const user = this.mockUser.find((user) => user.username === username);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }

  delete(params: number): CreateUserDto[] {
    const user = this.mockUser.filter((user) => user.id != params);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    this.mockUser = user;
    return this.mockUser;
  }

  // async update(body: UpdateUserDto, username: string): Promise<User[]> {
  //   const user = await this.find(username);
  //   const updateUser = { ...user, ...body };
  //   const index = this.mockUser.findIndex((user) => user.id === id);
  //   this.mockUser[index] = updateUser;
  //   return this.mockUser;
  // }
}
