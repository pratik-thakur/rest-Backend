import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { UserInterface } from "src/Models/user.model";
import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
  constructor(@InjectModel("User") private readonly userDB: Model<UserInterface>, private jwt: JwtService) {}

  @Post("register")
  async register(@Req() req: Request, @Res() res: Response) {
    let { firstName, lastName, email, password, contact } = req.body;
    const check = await this.userDB.findOne({ email });
    if (!check) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const user = new this.userDB({ firstName, lastName, email, password, contact });
      await user.save();
      const token = this.jwt.sign({ firstName, lastName, email, contact });
      return res.send({token:token});
    } else {
      return res.status(400).send("User already exists");
    }
  }

  @Post("login")
  async login(@Req() req: Request, @Res() res: Response) {
    let { email, password } = req.body;
    const user = await this.userDB.findOne({ email });
    if (user) {
      const val = await bcrypt.compare(password, user.password);
      if (val) {
        const { firstName, lastName, contact } = user;
        const token = this.jwt.sign({ firstName, lastName, email, contact });
        return res.json({ token: token });
      } else return res.status(400).send("invalid credentials");
    } else {
      return res.status(400).send("invalid credentials");
    }
  }
}
