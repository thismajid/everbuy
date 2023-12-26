import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AdminRoles } from '@prisma/client';

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async createSuperAdmin({
    firstName,
    lastName,
    email,
    mobile,
    username,
    password,
  }: {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    mobile: string;
    username: string;
    password: string;
  }): Promise<void> {
    const hashedPassword = await argon2.hash(password);
    await this.prisma.admin.upsert({
      where: { email },
      update: {},
      create: {
        firstName,
        lastName,
        email,
        mobile,
        username,
        password: hashedPassword,
        role: AdminRoles.SUPERADMIN,
      },
    });
  }
}
