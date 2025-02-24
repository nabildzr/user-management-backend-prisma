import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export class LoginUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Email atau Password Invalid");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email atau Password Invalid");
    }

    if (!process.env.JWT_SIKRIT) {
      throw new Error("JWT belum di konfigurasi");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SIKRIT,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}
