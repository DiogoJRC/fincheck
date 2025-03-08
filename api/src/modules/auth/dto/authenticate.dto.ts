import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthenticateDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}
