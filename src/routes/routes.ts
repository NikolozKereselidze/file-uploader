import express, { Request, Response } from "express";
import { createUser, loginUser } from "../controllers/userController";
import {
  createFolder,
  deleteFolder,
  getFolders,
} from "../controllers/folderController";
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

router.post("/folder/:id", deleteFolder);

router.post("/logout", function (req, res, next) {
  console.log("hello");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/", async (req: Request, res: Response) => {
  {
    if (req.user) {
      const folders = await getFolders(req, res);
      res.render("index", { folders });
    } else {
      res.redirect("/login");
    }
  }
});

module.exports = router;
