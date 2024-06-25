import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async registerUser(req: Request, res: Response) {
    const data = req.body;

    const user = await this.userService.registerUser(data);

    res.json(user);
  }

  async login(req: Request, res: Response) {
    const data = req.body;

    const user = await this.userService.login(data);

    res.json(user);
  }
}
