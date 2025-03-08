import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateAccessToken(user.uuid);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const user = await this.usersService.create(signupDto);

    const accessToken = await this.generateAccessToken(user.uuid);

    return { accessToken };
  }

  private generateAccessToken(userUuid: string) {
    return this.jwtService.signAsync({ sub: userUuid });
  }
}
