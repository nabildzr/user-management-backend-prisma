import { User } from "@prisma/client";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import bcrypt from "bcryptjs";

export class RegisterUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(user.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    return await this.userRepository.createUser(user);
  }
}
