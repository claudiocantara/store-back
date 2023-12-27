import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userCreateDto: CreateUserDto) {
    const uniqueUser = await this.prisma.user.findUnique({
      where: { email: userCreateDto.email },
    });

    if (uniqueUser) {
      throw new ConflictException('Email already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...userCreateDto,
        password: await hash(userCreateDto.password, 10),
      },
    });

    const { password, ...result } = newUser;

    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}
