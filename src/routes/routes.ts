import express, { Request, Response } from "express";
import { createUser, loginUser } from "../controllers/userController";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  {
    res.render("index");
  }
});

router.get("/signup", (req: Request, res: Response) => {
  {
    res.render("signup");
  }
});

router.post("/signup", createUser);

router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});
router.post("/login", loginUser);

module.exports = router;
