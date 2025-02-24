"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const loginUser_1 = require("../../application/use-cases/loginUser");
const registerUser_1 = require("../../application/use-cases/registerUser");
const global_1 = require("../../domain/global");
const UserRepository_1 = require("../../infrastructure/repositories/UserRepository");
const userRepository = new UserRepository_1.UserRepository();
const registerUserUseCase = new registerUser_1.RegisterUserUseCase(userRepository);
const loginUserUseCase = new loginUser_1.LoginUserUseCase(userRepository);
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const user = yield registerUserUseCase.execute({
                    id: (0, global_1.generateId)(),
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
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ error: "Email atau Password Invalid" });
                    return next();
                }
                const token = yield loginUserUseCase.execute(email, password);
                res.status(200).json({ message: "Login Berhasil", token: token });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({ user: req.user });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        });
    }
}
exports.UserController = UserController;
