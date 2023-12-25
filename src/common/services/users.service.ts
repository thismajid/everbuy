import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Phone } from 'ircheck';
import { PrismaService } from 'src/prisma/prisma.service';
import { INewUser } from '../interfaces';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  normalizeMobile({ mobile }: { mobile: string }): string {
    return `+98${Phone.normalizeMobile(mobile)}`;
  }

  async findByMobile({ mobile }: { mobile: string }): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        mobile,
      },
    });
  }

  async createNewUser({
    firstName = null,
    lastName = null,
    email = null,
    mobile,
  }: INewUser): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        mobile,
      },
    });
  }
}
