import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
      secret: env.jwtSecret,
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
