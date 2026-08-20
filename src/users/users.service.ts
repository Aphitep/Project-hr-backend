import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/interface/users.interface';
import { Prisma, Users } from 'generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private mockUser: CreateUserDto[] = [
    { id: 1, username: 'adam', password: 'abc123', role: Role.Admin },
    { id: 2, username: 'Peter', password: 'bob123', role: Role.User },
    { id: 3, username: 'John', password: 'john123', role: Role.User },
  ];
  async findAll(): Promise<Users[] | undefined> {
    const users = await this.prisma.users.findMany();
    if (!users) {
      throw new NotFoundException('No users');
    }
    return users;
  }

  async create(dto: CreateUserDto) {
    const hashPassword = await this.hash(dto.password);

    const data: Prisma.UsersCreateInput = {
      ...dto,
      password: hashPassword,
    };

    try {
      const user = await this.prisma.users.create({ data });
      const { password, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async find(username: string): Promise<User> {
    const user = this.mockUser.find((user) => user.username === username);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }

  delete(params: number): CreateUserDto[] {
    // const user = this.mockUser.filter((user) => user.id != params);
    // if (!user) {
    //   throw new NotFoundException('User not Found');
    // }
    // this.mockUser = user;
    return this.mockUser;
  }

  // async update(body: UpdateUserDto, username: string): Promise<User[]> {
  //   const user = await this.find(username);
  //   const updateUser = { ...user, ...body };
  //   const index = this.mockUser.findIndex((user) => user.id === id);
  //   this.mockUser[index] = updateUser;
  //   return this.mockUser;
  // }

  protected async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
