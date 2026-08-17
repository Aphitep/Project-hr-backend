import { PartialType } from '@nestjs/mapped-types';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;

  @IsIn(['Admin', 'Employee'])
  role: 'Admin' | 'Employee';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
