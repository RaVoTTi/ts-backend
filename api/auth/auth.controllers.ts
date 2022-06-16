import { Request, Response } from "express";
import { generateJWT } from "../../helpers/generateJWT";
import bcrypt from 'bcrypt'

import { User } from "../user/user.models"


export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ $and: [{ email }, { state: true }] });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: ["Email doesn't exist"],
        result: [],
      });
    }
    const access = user.comparePassword(password);
    if (!access) {
      return res.status(400).json({
        ok: false,
        msg: ["Password is incorrect"],
        result: [],
      });
    }

    const token = await generateJWT(user.id, user.isAdmin)

    res.status(200).json({
      ok: true,
      msg: ["Login Succesful"],
      token: token
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: ["Login Fail"],
      result: [],

    });
  }
};

export const signUpPost = async (req: Request, res: Response) => {
  const {
      password: noHashPassword,

      ...rest
  } = req.body



  const salt = bcrypt.genSaltSync(7)
  const password = bcrypt.hashSync(noHashPassword, salt)

  const user = new User({
      ...rest,
      password,
      
  })

  await user.save()

  res.status(201).json({
      ok: true,
      msg: ['User created succesful'],
  })
}
