import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { passport } from "../auth/passportConfig";
const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    res.redirect("/login");
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
}

export function loginUser(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
}
