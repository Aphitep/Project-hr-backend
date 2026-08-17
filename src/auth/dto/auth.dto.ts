import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class signInDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}
