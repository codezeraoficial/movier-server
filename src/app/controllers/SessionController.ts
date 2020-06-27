import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

import User from "../models/User";
import { checkPassword } from "./validations/encrypt";
import auth from "../../config/auth";

export class SessionController {
  public async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!checkPassword(password, user.password)) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const {_id, name} = user;

    return res.json({
      user:{
        id: _id,
        name,
        email
      },
      token: jwt.sign({_id}, auth.secret, {
        expiresIn: auth.expiresIn
      })
    })
  }
}
