import express, { Request, Response } from "express";
import { createUser, loginUser } from "../controllers/userController";
import { createFolder } from "../controllers/folderController";
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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

router.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  console.log("done"); // The uploaded file information
  res.redirect("/");
});

router.post("/new-folder", createFolder);

router.post("/logout", function (req, res, next) {
  console.log("hello");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/", (req: Request, res: Response) => {
  {
    if (req.user) {
      res.render("index");
    } else {
      res.redirect("/login");
    }
  }
});

module.exports = router;
