import { Request, Response } from "express";
import User from "../models/User";
import { UserModel } from "../models/interfaces/User";
import { encriptPassword } from "./validations/encrypt";

export class UsersController {
  public async index(req: Request, res: Response) {
    const users = await User.find();
    return res.status(200).json(users);
  }
  public async show(req: Request, res: Response) {
    const userId = req.params._id;

    if (!userId) return res.status(400).json({ error: "Id must be provided." });

    const user = await User.findById({ _id: userId });

    if (!user) return res.status(400).json({ error: "User not found." });

    return res.status(200).json(user);
  }
  public async store(req: Request, res: Response) {
    try {
      const params: UserModel = req.body;
      params.password = encriptPassword(params.password);

      User.create(params)
        .then((user) => res.status(201).json(user))
        .catch((err: Error) => res.status(500).json(err));
    } catch (error) {
      res.status(500).send(error);
    }
  }
  public async update(req: Request, res: Response) {
    const userId = req.params._id;
    const params: UserModel = req.body;

    if (!userId) return res.status(400).json({ error: "Id must be provided." });

    const user = await User.findById({ _id: userId });

    if (!user) return res.status(400).json({ error: "User was not found." });

    try {
      const user = await User.findByIdAndUpdate(userId, params, {
        new: true,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  public async destroy(req: Request, res: Response) {
    const userId = req.params._id;
    if (!userId) return res.status(400).json({ error: "Id must be provided." });

    const user = await User.findById({ _id: userId });

    if (!user) return res.status(400).json({ error: "user was not found." });

    try {
      await User.remove(user);
      return res.status(200).json({ message: "user  removed successfully." });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
