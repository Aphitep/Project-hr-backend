import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { Pubilc } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Pubilc()
  @Post('login')
  signIn(@Body() signInDto: signInDto) {
    return this.auth.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('Profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
