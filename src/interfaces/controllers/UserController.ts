import { RegisterUserUseCase } from "../../application/use-cases/registerUser";
import { generateId } from "../../domain/global";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { Request, Response } from "express";

const userRepository = new UserRepository();

const registerUserUseCase = new RegisterUserUseCase(userRepository);

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
        message: "User registered Successfully",
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
}
