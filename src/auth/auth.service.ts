import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.find(username);

    if (user.password != password) {
      throw new UnauthorizedException();
    }
  }
}
