import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/shared/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailAlreadyInUse = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailAlreadyInUse) {
      throw new ConflictException('This email is already in use!');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    return {
      name: user.name,
      email: user.email,
    };
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
    const { name, email } = updateUserDto;
    let { password } = updateUserDto;

    if (email) {
      const emailAlreadyInUse = await this.prismaService.user.findFirst({
        where: {
          email,
          uuid: { not: uuid },
        },
        select: { id: true },
      });

      if (emailAlreadyInUse) {
        throw new ConflictException('This email is already in use!');
      }
    }

    if (password) {
      password = await hash(password, 12);
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
