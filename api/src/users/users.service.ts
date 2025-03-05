import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailAlreadyInUse = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (emailAlreadyInUse) {
      throw new ConflictException('This email is already in use!');
    }

    const user = await this.prismaService.user.create({
      data: { name, email, password },
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
    const { name, email, password } = updateUserDto;

    if (email) {
      const emailAlreadyInUse = await this.prismaService.user.findFirst({
        where: {
          email,
          uuid: { not: uuid },
        },
      });

      if (emailAlreadyInUse) {
        throw new ConflictException('This email is already in use!');
      }
    }

    const user = await this.prismaService.user.update({
      data: { name, email, password },
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
