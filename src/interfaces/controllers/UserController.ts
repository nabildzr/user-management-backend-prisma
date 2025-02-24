import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/use-cases/loginUser";
import { RegisterUserUseCase } from "../../application/use-cases/registerUser";
import { generateId } from "../../domain/global";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = await registerUserUseCase.execute({
        id: generateId(),
        name,
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json({
        message: "User berhasil didaftarkan",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email atau Password Invalid" });
        return next();
      }

      const user = await userRepository.findUserByEmail(email);
      if (!user) {
        res.status(404).json({ error: "User tidak ditemukan" });
        return next();
      }

      const token = await loginUserUseCase.execute(user.email, password);
      res.status(200).json({ message: "Login Berhasil", token: token });
    } catch (e: any) {
      next(e);
    }
  }

  static async getProfile(req: AuthRequest, res: Response) {
    try {
      res.status(200).json({ user: req.user });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  static async deleteUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const userId = req.user.id;
      await userRepository.deleteUser(userId);

      res.status(200).json({ message: "User berhasil dihapus" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}
