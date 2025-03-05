import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDto);
  }

  findMany(findManyDto?: Prisma.UserFindManyArgs) {
    return this.prismaService.user.findMany(findManyDto);
  }

  findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findUniqueDto);
  }

  findFirst(findFirstDto: Prisma.UserFindFirstArgs) {
    return this.prismaService.user.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.UserUpdateArgs) {
    return this.prismaService.user.update(updateDto);
  }

  delete(deleteDto: Prisma.UserDeleteArgs) {
    return this.prismaService.user.delete(deleteDto);
  }
}
