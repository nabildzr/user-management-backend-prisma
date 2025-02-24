import { User } from "@prisma/client";
import prisma from "../prisma";

export class UserRepository {
  async createUser(user: User): Promise<User> {
    return await prisma.user.create({
      data: user,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
