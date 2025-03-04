import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async findOne(uuid: string) {
    const users = await this.prismaService.user.findUnique({
      where: { uuid },
    });

    return users;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password,
      },
      where: { uuid },
    });

    return user;
  }

  async remove(uuid: string) {
    await this.prismaService.user.delete({
      where: { uuid },
    });

    return { message: 'User deleted successfully!' };
  }
}
